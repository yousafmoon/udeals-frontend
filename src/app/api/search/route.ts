import { NextRequest, NextResponse } from 'next/server';

const endpoint = 'https://ujz.cuf.temporary.site/udeals/graphql';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const q = decodeURIComponent(searchParams.get('q') || '');
  const location = decodeURIComponent(searchParams.get('location') || '');
  const service = decodeURIComponent(searchParams.get('service') || '');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
      query SearchDeals {
  deals(first: 1000) {
    nodes {
      id
      title
      slug
      dealsHomepage {
        companyName
        location
        description
        discountPrice
        origionalPrice
        note
        displayAsVideo
        video {
          mediaItemUrl
        }
        poster {
          mediaItemUrl
        }
        image {
          sourceUrl
        }
        companyLogo {
          sourceUrl
        }
        address
        phone
        email
      }
      dealServices {
        nodes {
          name
          slug
        }
      }
    }
  }
}
        `,
      }),
    });

    const json = await response.json();
    let results = json?.data?.deals?.nodes || [];

    const keyword = q.toLowerCase();
    const locationFilter = location.toLowerCase();
    const serviceFilter = service.toLowerCase().replace(/\s+/g, '-');

    results = results.filter((item: any) => {
      const title = item.title?.toLowerCase() || '';
      const desc = item.dealsHomepage?.description?.toLowerCase() || '';
      const itemLocation = item.dealsHomepage?.location?.toLowerCase() || '';
      const serviceSlugs = item.dealServices?.nodes?.map((s: any) => s.slug?.toLowerCase()) || [];

      const matchKeyword = keyword
        ? title.includes(keyword) || desc.includes(keyword)
        : true;

      const matchLocation = location
        ? itemLocation === locationFilter
        : true;

      const matchService = service
        ? serviceSlugs.includes(serviceFilter)
        : true;

      return matchKeyword && matchLocation && matchService;
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
}
