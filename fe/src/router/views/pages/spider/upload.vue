<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import Multiselect from 'vue-multiselect'

/**
 * Upload component
 */
export default {
  page: {
    title: 'Upload',
  },
  components: { Layout, Multiselect },
  data() {
    return {
      mediaType: null,
      mediaTypeOptions: [
        "Image",
        "Video"
      ],
      mediaPlatform: null,
      mediaPlatformOptions: [
        "Youtube",
        "Twitter"
      ]
    }
  },
}
</script>

<template>
  <Layout>
    <div class="row mt-2 p-2">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form>
              
              <b-form-group
                label-cols-sm="10"
                label-cols-lg="2"
                label="Title"
                label-for="input-horizontal"
              >
                <b-form-input
                  id="input-horizontal"
                  placeholder="Type title here..."
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="10"
                label-cols-lg="2"
                label="Other info"
                label-for="example-textarea"
              >
                <b-form-textarea
                  id="example-textarea"
                  size="md"
                  rows="4"
                  placeholder="Type other info here..."
                ></b-form-textarea>
              </b-form-group>

              <div class="form-group row">
                <label class="col-lg-2 col-form-label">Media type</label>
                <div class="col-lg-10">
                  <multiselect
                    v-model="mediaType"
                    :options="mediaTypeOptions"
                    placeholder="Pick a media type"
                  ></multiselect>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-2 col-form-label">Media platform</label>
                <div class="col-lg-10">
                  <multiselect
                    v-model="mediaPlatform"
                    :options="mediaPlatformOptions"
                    :multiple="true"
                    placeholder="Pick a media type"
                  ></multiselect>
                </div>
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>

            </form>
            
          </div>
        </div>
      </div>
    </div>
    
  </Layout>
</template>
