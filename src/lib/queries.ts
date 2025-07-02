export const HOMEPAGE_ALL_SECTIONS_QUERY = `
  query {
    dealCategories {
      nodes {
        id
        name
        slug
        dealCategorySettings {
          layoutType
          styleType
        }
        deals {
          nodes {
            title
            slug
            dealCategories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            dealsHomepage {
              companyName
              location
              description
              expireOn
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
              whatsapp
              email
            }
          }
        }
      }
    }

    listingBanners {
      nodes {
        id
        title
        link
        listingBannerFields {
          listingBannersImage {
            sourceUrl
          }
         bannerLink
        }
      }
    }

    acfOptionsThemeOptions {
      ThemeOptions {
        headerBackground {
          sourceUrl
        }
        headerLogo {
          sourceUrl
          title
        }
        headerSlogan
        footerLogo {
          sourceUrl
          title
        }
        copyright
      }
    }

    page(id: "home", idType: URI) {
      homeFields {
        homeMainBanners {
          bannerImage {
            sourceUrl
          }
        }
        bannerCenterMainTitle
        homeCenterBanners {
          bannerCenterImage {
            sourceUrl
          }
            bannerExternalLink
        }
      }
    }

            aboutUsPage: page(id: "about-us", idType: URI) {
          homepageAboutusPageFields {
            aboutPageContent
          }
        }

        privacyPolicyPage: page(id: "privacy-policy", idType: URI) {
          homepagePrivacyPolicyPageFields {
            privacyPageContent
          }
        }

        termsPage: page(id: "terms-conditions", idType: URI) {
          homepageTermsPageFields {
            termsPageContent
          }
        }

        contactUsPage: page(id: "contact-us", idType: URI) {
          homepageContactPageFields {
            contactPageContent
          }
        }


    categories {
      nodes {
        id
        name
      }
    }

   dealServices(first: 100) {
      nodes {
        id
        name
        slug
        count
        dealServices {
          iconImage {
            sourceUrl
          }
          showOnHomepage
        }
      }
    }

    deals(first: 100) {
      nodes {
        title
        slug
        dealCategories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        dealsHomepage {
          companyName
          location
          description
          expireOn
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
          whatsapp
          email
        }
      }
    }
  }
`;


export const GET_SINGLE_DEAL_BY_SLUG = (slug: string) => `
  query GetDealBySlug {
    dealBy(slug: "${slug}") {
      title
      slug
      dealsHomepage {
        companyName
        companyLogo { sourceUrl }
        description
        address
        phone
        whatsapp
        email
      }
      specialDealSection {
        dealImage { sourceUrl }
        dealVideo { mediaItemUrl }
        videoTitle
        videoDescription
        companyBanner { sourceUrl }
      }
      aboutUsSection {
        aboutusHeading
        aboutusDescription
        aboutusRightSection {
          aboutusRightTitle
          aboutusRightDescription
        }
        aboutusWrapperTitle
        aboutusWrapperDescription
        aboutusWrapperButton
        aboutusWrapperVideo { mediaItemUrl }
        teamDescription
        teamImage { sourceUrl }
      }
      ourTeamSection {
        ourTeamMainTitle
        teamSlider {
          profileImage { sourceUrl }
          teamMemberName
          designation
        }
      }
      servicesSection {
        servicesMainHeading
        servicesBannerHeading
        servicesBannerDescription
        servicesBannerImage { sourceUrl }
        servicesGridSectionTopHeading
        servicesGrid {
          serviceImage { sourceUrl }
          serviceTitle
          serviceDescription
          serviceList { serviceName }
        }
      }
      pricingPackageSection {
        pricingPackageSectionBackground { sourceUrl }
        packageMainTitle
        packageMainSubtitle
        pricingPackage {
          packageName
          packagePrice
          packageServiceTitle
          packageServiceList { packageServiceName }
          bookAppointment
        }
      }
      beforeAfterSection {
        beforeAfterMainTitle
        beforeAfterGallery {
          beforeAfterImage { sourceUrl }
        }
      }
      photoGallerySection {
        photoGalleryMainTitle
        photoGalleryGrid {
          photoGalleryImage { sourceUrl }
          photoGalleryImageTitle
          photoGalleryImageDescription
        }
      }
            videoGallerySection {
              videoGalleryMainTitle
              videoGalleryGrid {
                videoPoster {
                  sourceUrl
                }
                videoFile {
                  mediaItemUrl
                }
                externalVideoLink
              }
            }

            beautyProductsSection {
              beautyProductsMainTitle
              beautyProductsSubtitle
              beautyProductGrid {
                  beautyProductCategory
                  beautyProductTitle
                  beautyProductDescription
                  beautyProductPrice
                  beautyProductImage {
                    sourceUrl
                  }
              }
            }

            contactUsSection{
              contactMainDescription
              contactStateName
              contactAddress
              contactPhone
              contactEmail
              contactLocation
              contactTiming
              contactLocationMap
              facebook
              twitter
              instagram
              linkedin
              youtube
              googlePlay
              appStore
            }

    }
  }
`;


export async function getDealBySlug(slug: string) {
  const queryString = GET_SINGLE_DEAL_BY_SLUG(slug);

  const res = await fetch('https://ujz.cuf.temporary.site/udeals/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryString }),
    next: { revalidate: 60 },
  });

  const json = await res.json();

  return json?.data?.dealBy;
}



