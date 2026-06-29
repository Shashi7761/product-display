"use client";

import { useState } from "react";

type Attribute = {
  name: string;
  label: string;
  options: string[];
};

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  function addAttribute() {
    setAttributes([
      ...attributes,
      {
        name: "",
        label: "",
        options: [""],
      },
    ]);
  }

  function updateAttribute(
    index: number,
    field: "name" | "label",
    value: string,
  ) {
    const copy = [...attributes];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    setAttributes(copy);
  }

  function addAttributeOption(index: number) {
    const copy = [...attributes];

    copy[index] = {
      ...copy[index],
      options: [...copy[index].options, ""],
    };

    setAttributes(copy);
  }

  function updateAttributeOption(
    attributeIndex: number,
    optionIndex: number,
    value: string,
  ) {
    const copy = [...attributes];
    const options = [...copy[attributeIndex].options];

    options[optionIndex] = value;

    copy[attributeIndex] = {
      ...copy[attributeIndex],
      options,
    };

    setAttributes(copy);
  }

  async function submit() {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug,
        categorySlug,
        description,
        price: Number(price),
        images: imageUrl
          ? [
              {
                url: imageUrl,
              },
            ]
          : [],
        attributes: attributes.map((attribute) => ({
          name: attribute.name,
          label: attribute.label,
          options: attribute.options
            .map((option) => option.trim())
            .filter(Boolean),
        })),
      }),
    });
    alert("Product created successfully");
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200";

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Create Product
        </h1>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5">
            <input
              value={name}
              placeholder="Product name"
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />

            <input
              value={slug}
              placeholder="Product slug, example: sail-tmt-bar"
              onChange={(e) => setSlug(e.target.value)}
              className={inputClass}
            />

            <input
              value={categorySlug}
              placeholder="Category slug, example: tmt"
              onChange={(e) => setCategorySlug(e.target.value)}
              className={inputClass}
            />

            <textarea
              value={description}
              placeholder="Description"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} resize-none`}
            />

            <input
              value={price}
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              className={inputClass}
            />

            <input
              value={imageUrl}
              placeholder="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Attributes</h2>

            <button
              type="button"
              onClick={addAttribute}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Add Attribute
            </button>
          </div>

          <div className="grid gap-4">
            {attributes.map((attribute, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <input
                  value={attribute.name}
                  placeholder="Attribute name, example: diameter"
                  onChange={(e) =>
                    updateAttribute(index, "name", e.target.value)
                  }
                  className={inputClass}
                />

                <input
                  value={attribute.label}
                  placeholder="Attribute label, example: Diameter"
                  onChange={(e) =>
                    updateAttribute(index, "label", e.target.value)
                  }
                  className={inputClass}
                />

                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-700">Options</p>

                    <button
                      type="button"
                      onClick={() => addAttributeOption(index)}
                      className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                    >
                      Add Option
                    </button>
                  </div>

                  {attribute.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      value={option}
                      placeholder="Option, example: 10mm"
                      onChange={(e) =>
                        updateAttributeOption(
                          index,
                          optionIndex,
                          e.target.value,
                        )
                      }
                      className={inputClass}
                    />
                  ))}
                </div>
              </div>
            ))}

            {attributes.length === 0 && (
              <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
                No attributes added.
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={submit}
          className="mt-6 w-full rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700"
        >
          Create Product
        </button>
      </div>
    </div>
  );
}
