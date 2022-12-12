import { c as create_ssr_component, b as compute_rest_props, d as spread, e as escape_attribute_value, f as escape_object, l as add_attribute, v as validate_component, i as escape, p as each, g as subscribe, n as noop, k as createEventDispatcher } from "../../chunks/index.js";
import { u as useQuery, z as getWordDefinition, M as Modal, A as capitalize, B as dedupeString, C as toRgexp, D as sanitizePattern, E as getWordsByLength, F as toChars } from "../../chunks/Modal.js";
import { groupBy, prop } from "rambda";
const Eye = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let { variation = "outline" } = $$props;
  let viewBox;
  let svgpath;
  let svgoutline = `<path d="M14.9998 12C14.9998 13.6569 13.6566 15 11.9998 15C10.3429 15 8.99976 13.6569 8.99976 12C8.99976 10.3431 10.3429 9 11.9998 9C13.6566 9 14.9998 10.3431 14.9998 12Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M2.45801 12C3.73228 7.94288 7.52257 5 12.0002 5C16.4778 5 20.2681 7.94291 21.5424 12C20.2681 16.0571 16.4778 19 12.0002 19C7.52256 19 3.73226 16.0571 2.45801 12Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> `;
  let svgsolid = ` <path d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89544 8 8.00001 8.89543 8.00001 10C8.00001 11.1046 8.89544 12 10 12Z" fill="${color}"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M0.457764 10C1.73202 5.94291 5.52232 3 9.99997 3C14.4776 3 18.2679 5.94288 19.5422 9.99996C18.2679 14.0571 14.4776 17 9.99995 17C5.52232 17 1.73204 14.0571 0.457764 10ZM14 10C14 12.2091 12.2091 14 10 14C7.79087 14 6.00001 12.2091 6.00001 10C6.00001 7.79086 7.79087 6 10 6C12.2091 6 14 7.79086 14 10Z" fill="${color}"/> `;
  let { ariaLabel = "eye" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0)
    $$bindings.variation(variation);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  {
    switch (variation) {
      case "outline":
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
        break;
      case "solid":
        svgpath = svgsolid;
        viewBox = "0 0 20 20";
        break;
      default:
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
    }
  }
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg>`;
});
const Minus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let { variation = "outline" } = $$props;
  let viewBox;
  let svgpath;
  let svgoutline = `<path d="M20 12H4" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> `;
  let svgsolid = `<path fill-rule="evenodd" clip-rule="evenodd" d="M3 10C3 9.44772 3.44772 9 4 9L16 9C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11L4 11C3.44772 11 3 10.5523 3 10Z" fill="${color}"/> `;
  let { ariaLabel = "minus" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0)
    $$bindings.variation(variation);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  {
    switch (variation) {
      case "outline":
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
        break;
      case "solid":
        svgpath = svgsolid;
        viewBox = "0 0 20 20";
        break;
      default:
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
    }
  }
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg>`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let { variation = "outline" } = $$props;
  let viewBox;
  let svgpath;
  let svgoutline = `<path d="M12 4V20M20 12L4 12" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> `;
  let svgsolid = `<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z" fill="${color}"/> `;
  let { ariaLabel = "plus" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0)
    $$bindings.variation(variation);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  {
    switch (variation) {
      case "outline":
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
        break;
      case "solid":
        svgpath = svgsolid;
        viewBox = "0 0 20 20";
        break;
      default:
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
    }
  }
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg>`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let { variation = "outline" } = $$props;
  let viewBox;
  let svgpath;
  let svgoutline = `<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> `;
  let svgsolid = ` <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="${color}"/> `;
  let { ariaLabel = "search" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0)
    $$bindings.variation(variation);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  {
    switch (variation) {
      case "outline":
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
        break;
      case "solid":
        svgpath = svgsolid;
        viewBox = "0 0 20 20";
        break;
      default:
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
    }
  }
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg>`;
});
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "" } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `<div role="${"status"}"${add_attribute("aria-label", label, 0)}><svg aria-hidden="${"true"}"${add_attribute("class", "mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" + $$props.class, 0)} viewBox="${"0 0 100 101"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"}" fill="${"currentColor"}"></path><path d="${"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"}" fill="${"currentFill"}"></path></svg></div>`;
});
const DefinitionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a;
  let definitionQuery;
  let meanings;
  let groupedBySpeechPart;
  let $definitionQuery, $$unsubscribe_definitionQuery = noop, $$subscribe_definitionQuery = () => ($$unsubscribe_definitionQuery(), $$unsubscribe_definitionQuery = subscribe(definitionQuery, ($$value) => $definitionQuery = $$value), definitionQuery);
  let { word = "" } = $$props;
  if ($$props.word === void 0 && $$bindings.word && word !== void 0)
    $$bindings.word(word);
  $$subscribe_definitionQuery(definitionQuery = useQuery(["word-definitions", word], () => getWordDefinition(String(word)), { enabled: Boolean(word) }));
  meanings = ((_a = $definitionQuery == null ? void 0 : $definitionQuery.data) == null ? void 0 : _a.meanings) ?? [];
  groupedBySpeechPart = groupBy(prop("speech_part"), meanings);
  $$unsubscribe_definitionQuery();
  return `${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      title: word.length ? capitalize(word) : "",
      id: "definition",
      open: word.length > 0
    },
    {},
    {
      default: () => {
        return `<section class="${"grid gap-4"}">${$definitionQuery.isError ? `<div>failed ${escape(JSON.stringify($definitionQuery.error))}</div>` : `${$definitionQuery.isLoading ? `<div class="${"p-2 flex gap-2 items-center justify-center"}">${validate_component(Spinner, "Spinner").$$render($$result, { label: "loading definition..." }, {}, {})}</div>` : `${$definitionQuery.isSuccess ? `<span class="${"font-semibold text-lg text-white/60"}">Meanings (${escape(meanings.length)})
      </span>
      <ul${add_attribute("aria-label", `${meanings.length} meanings for "${word}"`, 0)} class="${"grid gap-4 divide-y divide-gray-400"}">${each(Object.entries(groupedBySpeechPart), ([speech_part, meanings2]) => {
          return `<li class="${"list-item gap-2.5 pt-2"}"><span><i class="${"font-serif italic text-gray-400/80"}">${escape(capitalize(speech_part))}</i></span>
            <ul class="${"list-decimal list-outside ml-3.5 grid gap-2"}">${each(meanings2, (meaning) => {
            return `<li class="${"gap-2 list-item"}">${escape(capitalize(meaning.def))}
                  ${meaning.example ? `<div><span class="${"text-gray-400/80"}">Example</span>
                      <blockquote class="${"font-serif italic"}">\u2010 &quot;${escape(meaning.example)}&quot;
                      </blockquote>
                    </div>` : ``}
                </li>`;
          })}</ul>
          </li>`;
        })}</ul>` : ``}`}`}</section>`;
      }
    }
  )}`;
});
const WordInput_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "button.svelte-1g2rgsj{display:block;height:1.5rem;width:1.5rem;--tw-scale-x:1.75;--tw-scale-y:1.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;background-color:rgb(107 114 128 / 0.95)\n}@media(min-width: 768px){button.svelte-1g2rgsj{--tw-scale-x:2;--tw-scale-y:2;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n    }}button.svelte-1g2rgsj{transform-origin:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;font-size:1.25rem;line-height:1.75rem;font-weight:600;display:grid;place-items:center\n}",
  map: null
};
const WordInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let letters;
  let { id } = $$props;
  let { label = "" } = $$props;
  let { secondaryLabel = "" } = $$props;
  let { isStatic = false } = $$props;
  let { length = 4 } = $$props;
  let { value = "" } = $$props;
  createEventDispatcher();
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.secondaryLabel === void 0 && $$bindings.secondaryLabel && secondaryLabel !== void 0)
    $$bindings.secondaryLabel(secondaryLabel);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0)
    $$bindings.isStatic(isStatic);
  if ($$props.length === void 0 && $$bindings.length && length !== void 0)
    $$bindings.length(length);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$1);
  letters = Array.from({ length }).fill("");
  return `<div class="${"grid gap-1.5 md:gap-2 m-auto w-full md:w-fit"}">${slots.label ? slots.label({}) : `
    <label${add_attribute("for", `${id}-0`, 0)} class="${"inline-block text-lg md:text-2xl text-center"}">${escape(label)}</label>
  `}
  <div class="${[
    "flex items-center justify-between gap-2 bg-white/20 rounded-xl p-2 md:p-4 py-6 left-0 right-0 -top-14",
    isStatic ? "px-14" : ""
  ].join(" ").trim()}">${!isStatic ? `<button aria-label="${"decrease word length by 1 character"}" class="${"-translate-x-3 md:-translate-x-8 svelte-1g2rgsj"}">${validate_component(Minus, "Minus").$$render($$result, { size: "18" }, {}, {})}</button>` : ``}
    ${each(letters, (letter, idx) => {
    return `<input${add_attribute("id", `${id}-${idx}`, 0)} type="${"text"}" class="${"h-8 w-8 hidden bg-gray-200/80 md:block md:h-16 md:w-16 rounded text-xl md:text-4xl font-display text-black/80 text-center uppercase mx-auto"}"${add_attribute("maxlength", 1, 0)}${add_attribute("value", letter, 0)}${add_attribute("aria-label", `pattern input ${idx + 1}`, 0)}>`;
  })}
    <input${add_attribute("id", `-${id}-1`, 0)} type="${"text"}" class="${"block md:hidden h-16 bg-gray-200/80 rounded-lg text-xl font-display text-black/80 text-center uppercase w-[80%] tracking-widest"}"${add_attribute("placeholder", "_".repeat(length), 0)}${add_attribute("maxlength", length, 0)}${add_attribute("value", value, 0)}>
    ${!isStatic ? `<button aria-label="${"increase word length by 1 character"}" class="${"translate-x-3 md:translate-x-8 svelte-1g2rgsj"}">${validate_component(Plus, "Plus").$$render($$result, { size: "18" }, {}, {})}</button>` : ``}</div>
  ${slots["secondary-label"] ? slots["secondary-label"]({}) : `
    <span class="${"opacity-80 text-center text-sm"}">${escape(secondaryLabel)}</span>
  `}
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.filter-input.svelte-7y4d7w.svelte-7y4d7w{transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;height:3rem;border-bottom-width:2px;background-color:transparent;outline:2px solid transparent;outline-offset:2px;text-align:center;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-size:1.125rem;line-height:1.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em\n}@media(min-width: 768px){.filter-input.svelte-7y4d7w.svelte-7y4d7w{text-align:left\n    }}.pill.svelte-7y4d7w.svelte-7y4d7w{display:flex;align-items:center;gap:0.5rem;--tw-text-opacity:1;color:rgb(192 132 252 / var(--tw-text-opacity));opacity:0\n}.group.svelte-7y4d7w:hover .pill.svelte-7y4d7w{opacity:1\n}.pill.svelte-7y4d7w.svelte-7y4d7w{align-self:flex-end;border-radius:0.375rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(192 132 252 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.5rem;padding-right:0.5rem;font-size:0.75rem;line-height:1rem;transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}kbd.svelte-7y4d7w.svelte-7y4d7w{--tw-bg-opacity:1;background-color:rgb(75 85 99 / var(--tw-bg-opacity));vertical-align:bottom;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-weight:600;line-height:1.25;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;border-radius:0.375rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity));padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem\n}kbd.svelte-7y4d7w.svelte-7y4d7w:hover{--tw-bg-opacity:1;background-color:rgb(168 85 247 / var(--tw-bg-opacity))\n}',
  map: null
};
let minLength = 2;
let maxLength = 16;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a;
  let patternRegex;
  let wordsQuery;
  let $wordsQuery, $$unsubscribe_wordsQuery = noop, $$subscribe_wordsQuery = () => ($$unsubscribe_wordsQuery(), $$unsubscribe_wordsQuery = subscribe(wordsQuery, ($$value) => $wordsQuery = $$value), wordsQuery);
  let pattern = "";
  let include = "";
  let exclude = "";
  let patternLength = 5;
  let selectedWord;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (patternLength < minLength) {
        patternLength = minLength;
      } else if (patternLength > maxLength) {
        patternLength = maxLength;
      }
    }
    {
      if (include.length) {
        include = dedupeString(include);
      }
    }
    {
      if (exclude.length) {
        exclude = dedupeString(exclude);
      }
    }
    patternRegex = toRgexp(sanitizePattern(pattern, patternLength));
    $$subscribe_wordsQuery(wordsQuery = useQuery(
      ["words-by-length", patternLength, pattern, include, exclude],
      async () => {
        let result = await getWordsByLength(patternLength, patternRegex);
        if (include) {
          result = result.filter((x) => toChars(include).every((y) => x.includes(y)));
        }
        if (exclude) {
          result = result.filter((x) => !toChars(exclude).some((y) => x.includes(y)));
        }
        return result;
      },
      {
        enabled: pattern.length === patternLength
      }
    ));
    $$rendered = `<section class="${"flex flex-col gap-4 md:gap-8 flex-1 relative"}">${validate_component(WordInput, "WordInput").$$render(
      $$result,
      {
        id: "pattern",
        length: patternLength,
        value: pattern
      },
      {
        length: ($$value) => {
          patternLength = $$value;
          $$settled = false;
        },
        value: ($$value) => {
          pattern = $$value;
          $$settled = false;
        }
      },
      {
        "secondary-label": () => {
          return `<span slot="${"secondary-label"}" class="${"text-center p-1"}">use <kbd class="${"svelte-7y4d7w"}">*</kbd> or <kbd class="${"svelte-7y4d7w"}">_</kbd> to match any
    </span>`;
        },
        label: () => {
          return `<label for="${"pattern-0"}" slot="${"label"}" class="${"inline-block text-lg md:text-2xl text-center"}">Enter word pattern with <span class="${"border rounded px-2"}">${escape(patternLength)}</span> letters
    </label>`;
        }
      }
    )}

  ${$wordsQuery.isSuccess && pattern.length ? `<div class="${"max-w-md mx-auto w-full flex items-center justify-between"}"><div class="${"text-lg font-mono"}"><span class="${"text-orange-400"}">${escape($wordsQuery.data.length ? $wordsQuery.data.length : "No")}</span>
        words
      </div>
      <button class="${"btn btn-primary btn-xs md:btn-sm h-min transition-colors gap-1"}" aria-label="${"hide advanced filters"}">${`${validate_component(Plus, "Plus").$$render($$result, { size: "14" }, {}, {})}`}
        filters
      </button></div>
    ${``}` : ``}
  ${$wordsQuery.isFetched ? `<article class="${"card -mx-4 md:m-auto bg-gray-900 w-screen md:w-full flex-1 relative shadow-lg md:shadow-xl p-2"}"><div class="${"card-body overflow-y-scroll snap-proximity max-h-[49vh] md:max-h-[60vh] p-4"}">${$wordsQuery.isError ? `<div>failed ${escape(JSON.stringify($wordsQuery.error))}</div>` : `${$wordsQuery.isLoading ? `<div class="${"p-2 flex gap-2 items-center justify-center absolute top-2 right-0"}">${validate_component(Spinner, "Spinner").$$render($$result, { label: "loading dictionary..." }, {}, {})}</div>` : `${((_a = $wordsQuery.data) == null ? void 0 : _a.length) ? `<ul class="${"grid gap-1"}">${each($wordsQuery.data, (word) => {
      return `<li role="${"button"}" class="${"rounded p-2 px-3 bg-white/20 group flex items-center justify-between uppercase svelte-7y4d7w"}"><span class="${"text-base font-medium"}">${escape(word)}</span>
                <span class="${"pill svelte-7y4d7w"}">${validate_component(Eye, "Eye").$$render($$result, {}, {}, {})} definition </span>
              </li>`;
    })}</ul>` : `<div class="${"grid absolute inset-0 place-items-center"}"><div class="${"grid place-items-center gap-2"}">${validate_component(Search, "Search").$$render($$result, { size: "48" }, {}, {})}
              <span>No words matching the provided filters. </span></div></div>`}`}`}</div></article>` : ``}</section>
${validate_component(DefinitionModal, "DefinitionModal").$$render(
      $$result,
      { word: selectedWord },
      {
        word: ($$value) => {
          selectedWord = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_wordsQuery();
  return $$rendered;
});
export {
  Page as default
};
