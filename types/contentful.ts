// types/contentful.ts
import type { EntryFieldTypes } from "contentful";

export interface TypeProjectSkeleton {
  contentTypeId: "project";
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    thumbnail: EntryFieldTypes.AssetLink;
    skills: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    githubLink?: EntryFieldTypes.Text;
  };
}

export interface TypeAboutPageSkeleton {
  contentTypeId: "aboutPage";
  fields: {
    title: EntryFieldTypes.Text;
    profileImage: EntryFieldTypes.AssetLink;
    body: EntryFieldTypes.RichText;
  };
}