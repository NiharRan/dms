<template>
  <layout name="CompanyProfile">
    <!-- user list start -->
    <section class="users-list-wrapper">
      <!-- Ag Grid users list section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="card-body">
                <alert v-if="success">{{ success}}</alert>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
    <!-- user list ends -->
  </layout>
</template>

<script>
    import Layout from "../../Shared/Layout";
    import Alert from "../../Components/Alert";
    export default {
        name: "CompanyProfile",
        components: {Alert, Layout},
        props: {
          company: Object,
          errors: Object,
          success: String
        },
        data: function () {
            return {
              avatar: null,
            }
        },
        methods: {
            update: function () {
              this.$inertia.post(this.route('users.profile.account.update', this.user.id), {
                name: this.user.name,
                phone: this.user.phone,
                email: this.user.email,
                gender_id: this.user.gender_id,
                religion_id: this.user.religion_id,
                birth_date: this.user.birth_date,
              });
            },
          showImage: function (e) {
              const file = e.target.files[0];
              const url = URL.createObjectURL(file);
              $("#avatar").attr('src', url);
              this.avatar = file;
          },
          uploadImage: function () {
              if (this.avatar !== null) {
                const formData = new FormData();
                formData.append('avatar', this.avatar);
                this.$inertia.post(this.route('users.profile.avatar.update', this.user.id), formData);
              }
          }
        }
    }
</script>

<style>

</style>
