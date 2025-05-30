interface LayoutProps {
  title?: string
  description?: string
}

interface PageMeta {
  layoutProps?: LayoutProps
}

declare module '#app' {
  interface PageMeta {
    layoutProps?: LayoutProps
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    layoutProps?: LayoutProps
  }
}
