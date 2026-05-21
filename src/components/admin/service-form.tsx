"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImagePlus, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { iconKeys } from "@/lib/icon-map";
import { createClient } from "@/lib/supabase/client";
import { serviceSchema, type ServiceInput } from "@/lib/validations/service";
import type { Service } from "@/types";

/* =====================================================================
   ServiceForm · Crear o editar un servicio (con subida de imagen).
   ===================================================================== */

export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(service?.image ?? "");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service
      ? {
          title: service.title,
          slug: service.slug,
          tagline: service.tagline,
          shortDescription: service.shortDescription,
          description: service.description,
          icon: service.icon,
          accent: service.accent,
          price: service.price,
          benefits: service.benefits.join("\n"),
          features: service.features.join("\n"),
          videoUrl: service.video ?? "",
          isActive: service.isActive,
        }
      : {
          title: "",
          slug: "",
          tagline: "",
          shortDescription: "",
          description: "",
          icon: "sparkles",
          accent: "#8fb4e3",
          price: 0,
          benefits: "",
          features: "",
          videoUrl: "",
          isActive: true,
        },
  });

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "png";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage
        .from("service-media")
        .upload(path, file);
      if (error) {
        toast.error("No se pudo subir la imagen", {
          description: error.message,
        });
      } else {
        const { data } = supabase.storage
          .from("service-media")
          .getPublicUrl(path);
        setImageUrl(data.publicUrl);
        toast.success("Imagen subida");
      }
    } catch {
      toast.error("Supabase no está configurado");
    }
    setUploading(false);
  }

  async function onSubmit(values: ServiceInput) {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      toast.error("Supabase no está configurado");
      return;
    }

    const payload = {
      title: values.title,
      slug: values.slug,
      tagline: values.tagline,
      short_description: values.shortDescription,
      description: values.description,
      icon: values.icon,
      accent: values.accent,
      price: values.price,
      benefits: values.benefits
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      features: values.features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      image_url: imageUrl || null,
      video_url: values.videoUrl.trim() || null,
      is_active: values.isActive,
    };

    const { error } = service
      ? await supabase.from("services").update(payload).eq("id", service.id)
      : await supabase.from("services").insert(payload);

    if (error) {
      toast.error("No se pudo guardar el servicio", {
        description: error.message,
      });
      return;
    }

    toast.success(service ? "Servicio actualizado" : "Servicio creado");
    router.push("/admin/servicios");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            className="mt-1.5"
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            placeholder="diseno-web"
            className="mt-1.5"
            aria-invalid={!!errors.slug}
            {...register("slug")}
          />
          {errors.slug && (
            <p className="mt-1 text-xs text-destructive">
              {errors.slug.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="tagline">Eslogan</Label>
        <Input
          id="tagline"
          className="mt-1.5"
          aria-invalid={!!errors.tagline}
          {...register("tagline")}
        />
        {errors.tagline && (
          <p className="mt-1 text-xs text-destructive">
            {errors.tagline.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="shortDescription">Descripción corta</Label>
        <Textarea
          id="shortDescription"
          className="mt-1.5 min-h-20"
          aria-invalid={!!errors.shortDescription}
          {...register("shortDescription")}
        />
        {errors.shortDescription && (
          <p className="mt-1 text-xs text-destructive">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Descripción completa</Label>
        <Textarea
          id="description"
          className="mt-1.5 min-h-28"
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="icon">Icono</Label>
          <select
            id="icon"
            className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background/60 px-3 text-sm capitalize"
            {...register("icon")}
          >
            {iconKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="accent">Color</Label>
          <input
            id="accent"
            type="color"
            className="mt-1.5 h-11 w-full cursor-pointer rounded-lg border border-input bg-background/60 px-1"
            {...register("accent")}
          />
        </div>
        <div>
          <Label htmlFor="price">Precio (USD)</Label>
          <Input
            id="price"
            type="number"
            min={0}
            step="1"
            className="mt-1.5"
            aria-invalid={!!errors.price}
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="mt-1 text-xs text-destructive">
              {errors.price.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="benefits">Beneficios (uno por línea)</Label>
          <Textarea
            id="benefits"
            className="mt-1.5 min-h-28"
            {...register("benefits")}
          />
        </div>
        <div>
          <Label htmlFor="features">Características (una por línea)</Label>
          <Textarea
            id="features"
            className="mt-1.5 min-h-28"
            {...register("features")}
          />
        </div>
      </div>

      {/* Imagen */}
      <div>
        <Label>Imagen del servicio</Label>
        <div className="mt-1.5">
          {imageUrl ? (
            <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Imagen del servicio"
                className="aspect-video w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute right-2 top-2 grid size-8 place-items-center rounded-lg bg-black/60 text-white hover:bg-black/80"
                aria-label="Quitar imagen"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <label className="flex h-32 max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/40 text-sm text-muted-foreground transition-colors hover:border-brand/50">
              <ImagePlus className="size-6" />
              {uploading ? "Subiendo..." : "Subir imagen"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
                disabled={uploading}
              />
            </label>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="videoUrl">URL de video (opcional)</Label>
        <Input
          id="videoUrl"
          placeholder="https://www.youtube.com/embed/..."
          className="mt-1.5"
          {...register("videoUrl")}
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-foreground">
        <input
          type="checkbox"
          className="size-4 rounded border-input accent-brand"
          {...register("isActive")}
        />
        Servicio activo (visible en la web)
      </label>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        disabled={isSubmitting || uploading}
      >
        <Save className="size-4" />
        {isSubmitting
          ? "Guardando..."
          : service
            ? "Guardar cambios"
            : "Crear servicio"}
      </Button>
    </form>
  );
}
