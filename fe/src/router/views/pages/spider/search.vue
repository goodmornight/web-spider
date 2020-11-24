<script>
import Layout from '@layouts/main'
import MediaCard from '@components/spider/media-card'

/**
 * Search component
 */
export default {
  page: {
    title: 'Search',
  },
  components: { Layout, MediaCard },
  data() {
    return {

    }
  },
}
</script>

<template>
  <Layout>
    <div class="row">
      <div></div>
      <div class="col-lg-2 col-md-6 col-sm-12">
        <MediaCard />
      </div>
    </div>
  </Layout>
</template>
