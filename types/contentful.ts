// types/contentful.ts
import type { EntryFieldTypes } from "contentful";

export interface TypeProjectSkeleton {
  contentTypeId: "project";
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText; // Rich Text 필드
    thumbnail: EntryFieldTypes.AssetLink;
    skills: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    githubLink?: EntryFieldTypes.Text; // Optional 필드
  };
}