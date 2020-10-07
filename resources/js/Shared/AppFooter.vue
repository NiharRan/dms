<template>
  <div>
    <!-- BEGIN: Footer-->
    <footer v-if="$page.configData.mainLayoutType == 'horizontal'" class="footer footer-light navbar-shadow" :class="$page.configData.footerType">
    </footer>
    <footer v-else class="footer footer-light" :class="$page.configData.footerType">
      <p class="clearfix blue-grey lighten-2 mb-0">
        <span class="float-md-left d-block d-md-inline-block mt-25">COPYRIGHT &copy; {{ current_year }}
          <a class="text-bold-800 grey darken-2" href="#"></a>
          All rights Reserved
        </span>
        <span class="float-md-right d-none d-md-block">Hand-crafted & Made with<i class="feather icon-heart pink"></i> Nihar Ranjan Das</span>
        <button class="btn btn-primary btn-icon scroll-top" type="button"><i class="feather icon-arrow-up"></i></button>
      </p>
    </footer>
  </div>
</template>

<script>
    export default {
        name: "AppFooter",
        data: function () {
          return {
            current_year: ''
          }
        },
        created() {
          let today = new Date();
          this.current_year = today.getFullYear();
        }
    }
</script>

<style>

</style>
