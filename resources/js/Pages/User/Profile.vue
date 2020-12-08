<template>
  <layout name="UserProfile">
    <!-- user list start -->
    <section class="users-list-wrapper">
      <!-- Ag Grid users list section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="card-body">
                <alert v-if="success">{{ success}}</alert>
                <ul class="nav nav-tabs mb-3" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link d-flex align-items-center active" id="account-tab" data-toggle="tab" href="#account" aria-controls="account" role="tab" aria-selected="true">
                      <i class="feather icon-user mr-25"></i><span class="d-none d-sm-block">{{ __("Account") }}</span>
                    </a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="account" aria-labelledby="account-tab" role="tabpanel">
                    <!-- users edit media object start -->
                    <div class="media mb-2">
                      <div class="banner-logo-upload-box mx-auto" style="width: 105px;height: 105px;">
                        <img id="avatar" class="users-avatar-shadow rounded" height="90" width="90" :src="user.avatar_small" alt="">
                        <label class="btn-pill">
                          <i class="fa fa-camera"></i>
                          <input id="image" @change="showImage" type="file" name="avatar" class="hidden"/>
                        </label>
                      </div>
                      <div class="media-body mt-50 ml-2">
                        <h4 class="media-heading">{{ user.name }}</h4>
                        <div class="col-12 d-flex mt-1 px-0">
                          <button type="button" @click="uploadImage" class="btn btn-primary d-none d-sm-block mr-75 waves-effect waves-light">
                            {{ __("Change") }}</button>
                        </div>
                      </div>
                    </div>
                    <!-- users edit media object ends -->

                    <!-- users edit account form start -->
                    <form @submit.prevent="update">
                      <div class="row">
                        <div class="col-12 col-sm-6">
                          <div class="form-group">
                            <div class="controls">
                              <label>{{__("Name")}}</label>
                              <input
                                type="text"
                                class="form-control"
                                :placeholder="__('Name')"
                                v-model="user.name">
                              <div v-if="errors.name" class="help-block">{{ errors.name[0] }}</div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="controls">
                              <label>{{__("Contact No.")}}</label>
                              <input
                                type="text"
                                class="form-control"
                                :placeholder="__('Contact No.')"
                                v-model="user.phone">
                              <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone[0] }}</div>
                          </div>
                          </div>
                          <div class="form-group">
                            <div class="controls">
                              <label>{{__('Email Address')}}</label>
                              <input
                                type="email"
                                class="form-control"
                                :placeholder="__('Email Address')"
                                v-model="user.email">
                              <div v-if="errors.email" class="invalid-feedback">{{ errors.email[0] }}</div>
                          </div>
                          </div>
                        </div>
                        <div class="col-12 col-sm-6">
                          <div class="form-group">
                            <label>{{__("Gender")}}</label>
                            <select class="form-control" v-model="user.gender_id">
                              <option>{{__("Select Gender")}} ...</option>
                              <option
                                v-for="gender in genders"
                                :value="gender.id"
                                :selected="[gender.id == user.gender_id ? true : false ]"
                                :key="gender.id"
                                >{{ gender.name }}
                              </option>
                            </select>
                            <div v-if="errors.gender_id" class="invalid-feedback">{{ errors.gender_id[0] }}</div>
                          </div>
                          <div class="form-group">
                            <label>{{ __("Religion") }}</label>
                            <select
                              v-model="user.religion_id"
                              class="form-control">
                              <option value="">{{ __("Select Religion") }} ...</option>
                              <option
                                v-for="religion in religions"
                                :value="religion.id"
                                :selected="[religion.id == user.religion_id ? true : false]"
                                :key="religion.id">
                                {{ religion.name }}</option>
                            </select>
                            <div v-if="errors.religion_id" class="invalid-feedback">{{ errors.religion_id[0] }}</div>
                          </div>
                          <div class="form-group">
                            <div class="controls">
                              <label>{{ __("Birth Date") }}</label>
                              <date-picker class="form-control"
                                           :placeholder="__('Birth Date')"
                                           v-model="user.birth_date">
                              </date-picker>
                              <div v-if="errors.birth_date" class="help-block">{{ errors.birth_date[0] }}</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                          <button type="submit" class="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1 waves-effect waves-light">
                            {{ __('Update') }}</button>
                        </div>
                      </div>
                    </form>
                    <!-- users edit account form ends -->
                  </div>
                  <div class="tab-pane" id="information" aria-labelledby="information-tab" role="tabpanel">
                    <!-- users address edit Info form start -->
                    <!-- users address edit Info form ends -->
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
        name: "UserProfile",
        components: {Alert, Layout},
        props: {
          user: Object,
          genders: Array,
          religions: Array,
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
