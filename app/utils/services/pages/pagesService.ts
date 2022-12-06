import { PageBlockDto } from "~/application/dtos/marketing/PageBlockDto";
import { getGitHubSocialProof } from "~/utils/integrations/githubService";
import { defaultLandingPage } from "./defaultLandingPage";
import i18n from "~/i18n.server";

export type PageConfiguration = {
  slug: string;
  blocks: PageBlockDto[];
};

export async function getPageConfiguration({ request, t, slug }: { request: Request; t?: Function; slug?: string }): Promise<PageConfiguration> {
  if (!t) {
    t = await i18n.getFixedT(request);
  }
  if (!slug) {
    slug = new URL(request.url).pathname;
  }

  return {
    slug,
    blocks: await parsePageBlocks({ t, slug }),
  };
}

export async function parsePageBlocks({ t, slug }: { t: Function; slug: string }): Promise<PageBlockDto[]> {
  let blocks: PageBlockDto[] = [];
  if (slug === "/") {
    blocks = defaultLandingPage({ t });
  }
  await Promise.all(
    blocks.map(async (block) => {
      if (block.community?.type === "github") {
        block.community.members = await getGitHubSocialProof();
      }
    })
  );
  return blocks;
}
