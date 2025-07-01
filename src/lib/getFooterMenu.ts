// /lib/getFooterMenu.ts
export async function getFooterMenu() {
  try {
    const res = await fetch(
      'https://ujz.cuf.temporary.site/wp-json/custom/v1/footer-menu',
      {
        next: { revalidate: 60 }, 
      }
    );

    if (!res.ok) throw new Error('Failed to fetch menu');

    const menuItems = await res.json();

    return menuItems.map((item: any) => ({
      label: item.label || item.title,
      url: item.url,
    }));
  } catch (error) {
    console.error('Error loading footer menu:', error);
    return [];
  }
}
