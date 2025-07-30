import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

/*
Relies on Carousel, Card, Label, etc. from shadcn/ui.
This file contains the main components for the Web XrossMediaBar (XMB) interface.

Components:

1. XMBContainer
Main container for the Web XMB interface, responsible for rendering the entire media bar.
It is fullscreen, and when used alone, displays nothing.

2. XMBGradient
Responsible for rendering the traditional XrossMediaBar gradient background.
It is used in the XrossMediaBar component to provide a consistent background.

3. XMBBackground
Responsible for rendering the background image of the XrossMediaBar.
Alternative for XMBGradient, it can be used to set a custom background image.

4. XMBPrimaryMenu
Contains the menu itself.
Must be within a `XMBContainer`, throws an error if used elsewhere.

5. XMBMenuCategory
Represents a category in the XrossMediaBar, such as "Games" or "Videos".
It is used to group related items together. Should only be used within a `XMBPrimaryMenu`.

6. XMBMenuItem
Represents an individual item in the XrossMediaBar, such as a game or video.
It is used to display the icon and title of the item. Should only be used within a `XMBMenuCategory`.
*/

export function XMBContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function XMBPrimaryMenu({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (!children) {
    throw new Error("XMBPrimaryMenu must have children");
  }

  return (
    <Carousel
      orientation="horizontal"
      className={cn("w-full max-w-xs", className)}
      {...props}
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function XMBMenuCategory({
  title,
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (!children) {
    throw new Error("XMBMenuCategory must have children");
  }
  if (!title) {
    throw new Error("XMBMenuCategory must have a title");
  }

  return (
    <CarouselItem className={className} {...props}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <Carousel orientation="vertical" className="w-full">
          {children}
        </Carousel>
      </Card>
    </CarouselItem>
  );
}

export function XMBMenuItem({
  title,
  icon,
  className,
  index,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  index: number;
  icon?: string;
}) {
  return (
    <CarouselItem key={index} className={cn("p-1", className)}>
      <Card className={className} {...props}>
        <CardHeader className="flex flex-col items-center">
          {icon && <img src={icon} alt={`${title} icon`} className="mb-2" />}
          <CardTitle className="text-sm font-medium text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
      </Card>
    </CarouselItem>
  );
}
