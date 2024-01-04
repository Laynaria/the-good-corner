import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { Ad } from "../entities/ad";
import * as AdService from "../services/ad.service";
import { CreateAdInputType } from "../types/CreateAdInputType";
import { ModifyAdInputType } from "../types/ModifyAdInputType";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  @Authorized()
  getAllAd(
    @Arg("terms", { nullable: true }) terms: string,
    @Arg("categoryId", { nullable: true }) categoryId: number,
    @Arg("TagName", { nullable: true }) tagName: string
  ): Promise<Ad[]> {
    return AdService.findAll(categoryId, tagName, terms);
  }

  @Query(() => Ad)
  getAdById(@Arg("id") id: number): Promise<Ad | null> {
    return AdService.findById(id);
  }

  @Mutation(() => Ad)
  @Authorized()
  createAd(@Arg("ad") ad: CreateAdInputType): Promise<Ad> {
    return AdService.create({ ...ad });
  }

  @Mutation(() => Ad)
  updateAd(@Arg("ad") ad: ModifyAdInputType): Promise<Ad | undefined> {
    return AdService.modify(ad, ad.id);
  }

  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number): Promise<string> {
    await AdService.deleteAd(id);
    return `Ad deleted on id ${id}`;
  }
}
