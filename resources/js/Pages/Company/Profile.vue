<template>
  <layout name="CompanyProfile">
    <!-- user list start -->
    <section class="users-list-wrapper">
      <!-- Ag Grid users list section start -->
      <div id="basic-examples">
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="card-body">
                    <img :src="company.current_logo"
                         class="company-profile rounded-circle img-border box-shadow-1"
                         alt="Card image">
                    <h3 class="mt-2 mb-0">{{ company.name }}</h3>
                    <p>{{ company.owner }}</p>
                    <p class="mb-0"><i class="fa fa-envelope-square"></i> <span>{{ company.email }}</span></p>
                    <p class="mb-0"><i class="fa fa-phone-square"></i> <span>{{ company.phone }}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="box-shadow-1 rounded height-same text-center">
                          <h2>{{ __('Head Office') }}</h2>
                          <hr>
                          <p>{{ company.head_office }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="box-shadow-1 rounded height-same text-center">
                          <h2>{{ __('Dipu Office') }}</h2>
                          <hr>
                          <p>{{ company.dipu_office }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="box-shadow-1 rounded height-same text-center">
                          <h2>{{ __('Address') }}</h2>
                          <hr>
                          <p>{{ company.address }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="box-shadow-1 rounded height-same text-center">
                          <h2>{{ __('Sales Center') }}</h2>
                          <hr>
                          <p>{{ company.sales_center }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
.company-profile {
  width: 250px;
  height: 250px;
}
.height-same {
  height: 167px;
  padding: 20px;
  margin: 10px;
}
</style>
