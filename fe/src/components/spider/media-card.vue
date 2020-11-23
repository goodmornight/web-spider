<script>
export default {
  props: {
    username: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    context: {
      type: String,
      default: null,
    },
    poster: {
      type: String,
      default: null
    },
    fileUrl:{
      type: String,
      default: null,
    },
    fileType: {
    	type: String,
      default: null,
    },
    fileSize: {
      type: Number,
      default: 0
    }
    updateTime: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      default: null,
    },
    isEncrypted: {
      type: Boolean,
      default: false,
    }
  },
}
</script>
<template>
    <div>
      <b-card
			:img-src="require('@assets/images/small/img-1.jpg')"
			img-alt="Card image"
			img-top
		>
			<b-card-title>
				<h5 class="card-title font-size-16">Card title</h5>
			</b-card-title>
			<b-card-text
				>Some quick example text to build on the card title and make up
				the bulk of the card's content. With supporting text below as a
				natural lead-in to additional content.</b-card-text
			>
			<b-button href="javascript:void(0);" variant="primary"
				>Button</b-button
			>
		</b-card>
	</div>
</template>
<style type="text/css">
	
</style>