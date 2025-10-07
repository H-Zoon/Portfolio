// types/contentful.ts
import type { EntryFieldTypes } from "contentful";

export interface TypeAboutSkeleton {
  contentTypeId: "about";
  fields: {
    title: EntryFieldTypes.Text;
    profileImage: EntryFieldTypes.AssetLink;
    introduction: EntryFieldTypes.RichText;
  };
}

export interface TypeProjectSkeleton {
  contentTypeId: "project";
  fields: {
    title: EntryFieldTypes.Text; //포트폴리오 제목
    slug: EntryFieldTypes.Text; //페이지 이동을 위한 slug
    preview: EntryFieldTypes.Text; // 메인페이지 미리보기 설명
    summary: EntryFieldTypes.RichText; // 포트폴리오 프로젝트 설명
    content: EntryFieldTypes.RichText; // 포트폴리오 본문
    thumbnail: EntryFieldTypes.AssetLink; // 프로젝트 이미지
    skills: EntryFieldTypes.Array<EntryFieldTypes.Symbol>; // 기술
    gitHubLink?: EntryFieldTypes.Text; // 깃허브 링크
    storeLink?: EntryFieldTypes.Text; // 스토어 링크
  };
}

export interface TypeActiveSkeleton {
  contentTypeId: "active";
  fields: {
    title: EntryFieldTypes.Text; //포트폴리오 제목
    slug: EntryFieldTypes.Text; //페이지 이동을 위한 slug
    preview: EntryFieldTypes.Text; // 메인페이지 미리보기 설명
    summary: EntryFieldTypes.RichText; // 포트폴리오 프로젝트 설명
    content: EntryFieldTypes.RichText; // 포트폴리오 본문
    thumbnail: EntryFieldTypes.AssetLink; // 프로젝트 이미지
    skills: EntryFieldTypes.Array<EntryFieldTypes.Symbol>; // 기술
    gitHubLink?: EntryFieldTypes.Text; // 깃허브 링크
    storeLink?: EntryFieldTypes.Text; // 스토어 링크
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