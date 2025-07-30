import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

export function XMB({
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

type XMBMenu = {
  focused?: boolean;
  index?: number;
};

export function XMBMenu({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ReactElement<XMBMenu>[];
}) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Inject `focused` state into correct child
  const items = React.Children.map(children, (child, idx) =>
    React.isValidElement<XMBMenu>(child)
      ? React.cloneElement(child, {
          focused: idx === selectedIndex,
          index: idx,
        })
      : child
  );

  return (
    <Carousel
      orientation="horizontal"
      className={cn(
        "w-full max-w-xs overflow-visible [&>div]:overflow-visible",
        className
      )}
      setApi={setApi}
      {...props}
    >
      <CarouselContent className="overflow-visible">{items}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function XMBCategory({
  children,
  className,
  focused,
  ...props
}: React.ComponentProps<"div"> & { focused?: boolean }) {
  if (!children) {
    throw new Error("XMBCategory must have children to render items.");
  }

  // Inject `focused` into children if they accept it
  const injectedChildren = React.Children.map(children, (child) =>
    React.isValidElement<XMBMenu>(child)
      ? React.cloneElement(child, { focused })
      : child
  );

  return (
    <CarouselItem className={className} {...props}>
      {injectedChildren}
    </CarouselItem>
  );
}

export function XMBCategoryTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (!children) {
    throw new Error("XMBCategoryTitle must have children (text, icon, etc.)");
  }
  return (
    <Card
      className={cn(
        "w-full max-w-sm bg-transparent shadow-none border-none",
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex flex-col items-center justify-center">
          {children}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export function XMBCategoryContent({
  children,
  className,
  focused = false,
  ...props
}: React.ComponentProps<"div"> & { focused?: boolean }) {
  return (
    <Carousel
      orientation="vertical"
      className={cn(
        focused ? "opacity-100" : "opacity-0",
        "w-full transition-opacity duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </Carousel>
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
