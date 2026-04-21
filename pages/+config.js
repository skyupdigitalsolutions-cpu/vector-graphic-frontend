import vikeReact from "vike-react/config";

export default {
  extends: vikeReact,
  clientRouting: true,

  meta: {
    metaDescription: {
      env: { server: true, client: true }
    },
    keywords: {
      env: { server: true, client: true }
    }
  }
}