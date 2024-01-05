import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";
import { Ad } from "../entities/ad";
import * as AdService from "../services/ad.service";
import { CreateAdInputType } from "../types/CreateAdInputType";
import { ModifyAdInputType } from "../types/ModifyAdInputType";
import { Context } from "apollo-server-core";
import { User } from "../entities/user";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  @Authorized()
  getAllAd(
    @Arg("terms", { nullable: true }) terms: string,
    @Arg("categoryId", { nullable: true }) categoryId: number,
    @Arg("TagName", { nullable: true }) tagName: string,
    @Ctx() ctx: Context
  ): Promise<Ad[]> {
    return AdService.findAll(categoryId, tagName, terms);
  }

  @Query(() => Ad)
  getAdById(@Arg("id") id: number): Promise<Ad | null> {
    return AdService.findById(id);
  }

  @Mutation(() => Ad)
  @Authorized()
  createAd(
    @Arg("ad") ad: CreateAdInputType,
    @Ctx("user") user: User
  ): Promise<Ad> {
    return AdService.create({ ...ad, user });
  }

  @Mutation(() => Ad)
  @Authorized()
  async updateAd(
    @Arg("ad") ad: ModifyAdInputType,
    @Ctx("user") user: User
  ): Promise<Ad | undefined> {
    const checkAd = await AdService.findById(ad.id);

    if (checkAd?.user.id === user.id || user.role === "ADMIN") {
      return AdService.modify(ad, ad.id);
    }

    return undefined;
  }

  @Mutation(() => String)
  async deleteAd(
    @Arg("id") id: number,
    @Ctx("user") user: User
  ): Promise<string> {
    const ad = await AdService.findById(id);

    if (ad?.user.id === user.id || user.role === "ADMIN") {
      await AdService.deleteAd(id);
    }

    return `OK`;
  }
}
