"use client";

import { useState } from "react";
import {
  ConditionBadge,
  ControllerButton,
  CoverBlock,
  DiscountBadge,
  PriceDisplay,
  ProductCard,
  RatingStars,
  WishlistHeart,
} from "@/components/product";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import type { Game } from "@/types";

const controllerPlatforms = [
  "NES",
  "SNES",
  "N64",
  "GameCube",
  "Wii",
  "Switch",
  "Game Boy",
  "GBA",
  "DS",
  "PS1",
  "PS2",
  "PS3",
  "PSP",
  "Xbox",
  "Xbox360",
  "Genesis",
  "Saturn",
  "Dreamcast",
  "Game Gear",
];

const mockGames: Game[] = [
  {
    id: "nes-mario-3",
    title: "Super Mario Bros. 3",
    slug: "super-mario-bros-3",
    platform: "NES",
    system: "NES",
    systemCode: "NES",
    condition: "CIB",
    price: 7499,
    originalPrice: 8999,
    discountPercent: 17,
    coverColor: "#8B8B8B",
    images: [],
    rating: 4.8,
    reviewCount: 1180,
    stock: 5,
    tags: ["nes", "platformer", "cib"],
    vendor: "nintendo",
  },
  {
    id: "snes-metroid",
    title: "Super Metroid",
    slug: "super-metroid",
    platform: "SNES",
    system: "Super Nintendo",
    systemCode: "SNES",
    condition: "Loose",
    price: 5999,
    coverColor: "#9B2FAE",
    images: [],
    rating: 4.9,
    reviewCount: 1203,
    stock: 7,
    tags: ["snes", "action", "loose"],
    vendor: "nintendo",
  },
  {
    id: "n64-zelda",
    title: "The Legend of Zelda: Ocarina of Time",
    slug: "the-legend-of-zelda-ocarina-of-time",
    platform: "N64",
    system: "Nintendo 64",
    systemCode: "N64",
    condition: "CIB",
    price: 6999,
    originalPrice: 8999,
    discountPercent: 22,
    coverColor: "#b8902f",
    images: [],
    rating: 4.9,
    reviewCount: 1284,
    stock: 3,
    tags: ["n64", "rpg", "cib"],
    vendor: "nintendo",
  },
  {
    id: "ps1-ff7",
    title: "Final Fantasy VII",
    slug: "final-fantasy-vii",
    platform: "PS1",
    system: "PlayStation",
    systemCode: "PS1",
    condition: "CIB",
    price: 5999,
    coverColor: "#003087",
    images: [],
    rating: 4.8,
    reviewCount: 2447,
    stock: 8,
    tags: ["ps1", "rpg", "cib"],
    vendor: "playstation",
  },
  {
    id: "xbox-halo",
    title: "Halo: Combat Evolved",
    slug: "halo-combat-evolved",
    platform: "Xbox",
    system: "Original Xbox",
    systemCode: "Xbox",
    condition: "Loose",
    price: 2499,
    coverColor: "#107C10",
    images: [],
    rating: 4.7,
    reviewCount: 1540,
    stock: 12,
    tags: ["xbox", "shooter", "loose"],
    vendor: "xbox",
  },
  {
    id: "dc-sonic",
    title: "Sonic Adventure 2",
    slug: "sonic-adventure-2",
    platform: "Dreamcast",
    system: "Sega Dreamcast",
    systemCode: "DC",
    condition: "CIB",
    price: 2999,
    originalPrice: 3999,
    discountPercent: 25,
    coverColor: "#E67E22",
    images: [],
    rating: 4.6,
    reviewCount: 768,
    stock: 4,
    tags: ["dreamcast", "platformer", "cib"],
    vendor: "sega",
  },
];

export function AtomsTestClient() {
  const [externalWishlisted, setExternalWishlisted] = useState(false);

  return (
    <div className="space-y-12">
      <section className="rounded-card border border-border bg-bg-surface p-6">
        <h2 className="mb-5 font-display text-display-sm uppercase text-text-primary">
          CoverBlock
        </h2>
        <div className="grid max-w-3xl grid-cols-2 gap-5 md:grid-cols-4">
          <CoverBlock platform="n64" systemCode="N64" title="Ocarina of Time" coverColor="#b8902f" />
          <CoverBlock platform="ps1" systemCode="PS1" title="Final Fantasy VII" />
          <CoverBlock platform="xbox" systemCode="Xbox" title="Halo: CE" />
          <CoverBlock platform="dreamcast" systemCode="DC" title="Sonic Adventure 2" imageUrl="/next.svg" />
        </div>
      </section>

      <section className="rounded-card border border-border bg-bg-surface p-6">
        <h2 className="mb-5 font-display text-display-sm uppercase text-text-primary">
          Badges, Price, Rating, Wishlist
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <ConditionBadge condition="CIB" />
          <ConditionBadge condition="Loose" />
          <ConditionBadge condition="New/Sealed" />
          <DiscountBadge percent={22} />
          <PriceDisplay price={6999} originalPrice={8999} showSaving />
          <RatingStars rating={4.6} reviewCount={1284} />
          <WishlistHeart
            productId="test-controlled"
            isWishlisted={externalWishlisted}
            onToggle={() => setExternalWishlisted((value) => !value)}
          />
          <WishlistHeart productId="test-store-backed" />
        </div>
      </section>

      <section className="rounded-card border border-border bg-bg-surface p-6">
        <h2 className="mb-5 font-display text-display-sm uppercase text-text-primary">
          ControllerButton Variants
        </h2>
        <div className="grid gap-6 xl:grid-cols-2">
          {controllerPlatforms.map((platform) => (
            <div
              key={platform}
              className="grid gap-4 rounded-card border border-border bg-bg-dark p-4 md:grid-cols-[140px_1fr]"
            >
              <div>
                <div className="font-display text-display-xs uppercase text-text-primary">
                  {platform}
                </div>
                <div className="text-body-sm text-text-secondary">3D style</div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ControllerButton platform={platform} variant={1} onClick={() => undefined} />
                <ControllerButton platform={platform} variant={2} onClick={() => undefined} />
                <ControllerButton platform={platform} variant={3} onClick={() => undefined} />
                <ControllerButton platform={platform} variant={4} onClick={() => undefined} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-card border border-border bg-bg-surface p-6">
        <h2 className="mb-5 font-display text-display-sm uppercase text-text-primary">
          Subtle Depth
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <ControllerButton platform="N64" variant={1} style="subtle" onClick={() => undefined} />
          <ControllerButton platform="N64" variant={2} style="subtle" onClick={() => undefined} />
          <ControllerButton platform="PS2" variant={3} style="subtle" onClick={() => undefined} />
          <ControllerButton platform="Dreamcast" variant={4} style="subtle" onClick={() => undefined} />
          <ControllerButton platform="Switch" variant={4} loading onClick={() => undefined} />
          <ControllerButton platform="Xbox" variant={4} added onClick={() => undefined} />
        </div>
      </section>

      <section className="rounded-card border border-border bg-bg-surface p-6">
        <h2 className="mb-5 font-display text-display-sm uppercase text-text-primary">
          ProductCard Grid
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {mockGames.map((game, index) => (
            <ProductCard
              key={game.id}
              game={game}
              showSaving
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      <section className="rounded-card border border-border bg-bg-surface p-6">
        <h2 className="mb-5 font-display text-display-sm uppercase text-text-primary">
          ProductCard List
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <ProductCard game={mockGames[2]} variant="list" showSaving />
          <ProductCard game={mockGames[5]} variant="list" showSaving />
        </div>
      </section>

      <section className="rounded-card border border-border bg-bg-surface p-6">
        <h2 className="mb-5 font-display text-display-sm uppercase text-text-primary">
          SkeletonCard
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
