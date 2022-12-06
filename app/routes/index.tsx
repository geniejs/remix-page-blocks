import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { getSeoMetaTags } from "~/utils/services/seoService";
import { MetaTagsDto } from "~/application/dtos/seo/MetaTagsDto";
import PageBlocks from "~/components/front/blocks/PageBlocks";
import { PageBlockDto } from "~/application/dtos/marketing/PageBlockDto";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getPageConfiguration, PageConfiguration } from "~/utils/services/pages/pagesService";
import { getUserInfo, UserSession } from "~/utils/session.server";
import PageBlockEditMode from "~/components/front/blocks/PageBlockEditMode";
import i18n from "~/i18n.server";

type LoaderData = {
  userSession: UserSession;
  metaTags: MetaTagsDto;
  page: PageConfiguration;
};

export let loader: LoaderFunction = async ({ request }) => {
  let t = await i18n.getFixedT(request);

  try {
    const page = await getPageConfiguration({ request, t });
    const userSession = await getUserInfo(request);
    const data: LoaderData = {
      userSession,
      metaTags: await getSeoMetaTags(request),
      page,
    };
    return json(data);
  } catch (e) {
    return json({});
  }
};

export const meta: MetaFunction = ({ data }) => ({
  ...data?.metaTags,
});

export default function IndexRoute() {
  const data = useLoaderData<LoaderData>();
  const [blocks, setBlocks] = useState<PageBlockDto[]>(data.page.blocks);
  const [searchParams] = useSearchParams();

  function isEditMode() {
    return searchParams.get("editMode") !== "false";
  }

  return (
    <div>
      <PageBlockEditMode items={blocks} onSetBlocks={(e) => setBlocks(e)} />
      <PageBlocks items={blocks} editMode={isEditMode()} onChange={(e) => setBlocks(e)} />
    </div>
  );
}
