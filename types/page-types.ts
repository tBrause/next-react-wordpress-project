// TYPES for WP-Blog-Entries
type PagePostBaseGql = {
    id: string;
    title?: string;
    date: string;
    content?: string;
};

// Teaser for Overview-Blog-Page
export type PagePostTeaserGql = PagePostBaseGql & {
    excerpt: string;
    slug: string;
};

// For Blog-Entrie-Full-View
export type PagePostFullGql = PagePostBaseGql & {
    link: string;
    slug: string;
    excerpt: string;
    guid: string;
    modified: string;
    parentId: string;
    content: string;
};


// TYPES for WP-Blog-Entries
type PageBaseGql = {
    id: string;
    title?: string;
    date: string;
    content?: string;
};



export type PageMainGql = PageBaseGql & {
    link: string;
    slug: string;
    excerpt: string;
    guid: string;
    modified: string;
    parentId: string;
    content: string;
};

