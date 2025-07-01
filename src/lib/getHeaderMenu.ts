// /lib/getHeaderMenu.ts
export async function getHeaderMenu() {
  try {
    const res = await fetch(
      'https://ujz.cuf.temporary.site/wp-json/custom/v1/header-menu',
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch header menu');

    const menuItems = await res.json();

    return menuItems.map((item: any) => ({
      label: item.label || item.title,
      url: item.url,
      target: item.target || '_self',
    }));
  } catch (error) {
    console.error('Error loading header menu:', error);
    return [];
  }
}
