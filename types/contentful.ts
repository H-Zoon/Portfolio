// types/contentful.ts
import type { EntryFieldTypes } from "contentful";

export interface TypeAboutSkeleton {
  contentTypeId: "profileImage";
  fields: {
    //title: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
    //introduction: EntryFieldTypes.RichText;
  };
}

// project와 active를 위한 공통 스켈레톤 인터페이스
export interface TypePortfolioItemSkeleton {
  contentTypeId: "project" | "active"; // contentful의 content-type id
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    preview: EntryFieldTypes.Text;
    summary: EntryFieldTypes.RichText;
    content: EntryFieldTypes.RichText;
    thumbnail: EntryFieldTypes.AssetLink;
    skills: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    gitHubLink?: EntryFieldTypes.Text;
    storeLink?: EntryFieldTypes.Text;
  };
}


/**
 * @name Education Item (educationItem)
 * @description 학력 정보 하나를 나타내는 모델
 */
export interface TypeEducationSkeleton {
  contentTypeId: "education";
  fields: {
    schoolName: EntryFieldTypes.Text;
    period: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
  };
}

/**
 * @name Record Item (recordItem)
 * @description 활동 및 수상 내역 하나를 나타내는 모델
 */
export interface TypeRecordSkeleton {
  contentTypeId: "record";
  fields: {
    title: EntryFieldTypes.Text;
    date: EntryFieldTypes.Date;
  };
}

export interface TypeImageWithTextSkeleton {
  contentTypeId: "imageWithText";
  fields: {
    image: EntryFieldTypes.AssetLink;
    text: EntryFieldTypes.RichText;
  };
}