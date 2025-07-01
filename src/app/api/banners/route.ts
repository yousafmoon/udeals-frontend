import { NextRequest } from 'next/server';
import { gql, request } from 'graphql-request';

const endpoint = 'https://ujz.cuf.temporary.site/udeals/graphql';

type Banner = {
  id: string;
  title?: string;
  imageUrl: string;
  bannerLink?: string;
};

type GraphQLBannerResponse = {
  listingBanners: {
    nodes: {
      id: string;
      title?: string;
      listingBannerFields?: {
        listingBannersImage?: {
          sourceUrl?: string;
        };
        bannerLink?: string;
      };
    }[];
  };
};

export async function GET(req: NextRequest) {
  const query = gql`
    query GetBanners {
      listingBanners {
        nodes {
          id
          title
          listingBannerFields {
            listingBannersImage {
              sourceUrl
            }
            bannerLink
          }
        }
      }
    }
  `;

  try {
    const data: GraphQLBannerResponse = await request(endpoint, query);

    const banners: Banner[] = data?.listingBanners?.nodes?.map((banner) => ({
      id: banner.id,
      title: banner.title || '',
      imageUrl: banner?.listingBannerFields?.listingBannersImage?.sourceUrl || '',
      bannerLink: banner?.listingBannerFields?.bannerLink || '',
    })) || [];

    return new Response(JSON.stringify(banners), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching banners:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch banners' }), {
      status: 500,
    });
  }
}
