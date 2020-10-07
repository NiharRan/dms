<template>
  <div>
    <nav v-if="$page.configData.mainLayoutType == 'horizontal'"
      class="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-fixed"
      :class="$page.configData.navbarColor">
      <div class="navbar-header d-xl-block d-none">
        <ul class="nav navbar-nav flex-row">
          <li class="nav-item"><a class="navbar-brand" href="dashboard-analytics">
            <div class="brand-logo"></div></a></li>
        </ul>
      </div>
    </nav>
    <nav v-else class="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-light navbar-shadow"
      :class="`${$page.configData.navbarClass} ${$page.configData.navbarColor}`">
      <div class="navbar-wrapper">
        <div class="navbar-container content">
          <div class="navbar-collapse" id="navbar-mobile">
            <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">
              <ul class="nav navbar-nav">
                <li class="nav-item mobile-menu d-xl-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ficon feather icon-menu"></i></a></li>
              </ul>
              <ul class="nav navbar-nav bookmark-icons">
                <li class="nav-item d-none d-lg-block"><a class="nav-link" href="sk-layout-2-columns" data-toggle="tooltip" data-placement="top" title="2-Columns"><i class="ficon feather icon-sidebar"></i></a></li>
              </ul>
              <ul class="nav navbar-nav">
                <li class="nav-item d-none d-lg-block"><a class="nav-link bookmark-star"><i class="ficon feather icon-star warning"></i></a>
                  <div class="bookmark-input search-input">
                    <div class="bookmark-input-icon"><i class="feather icon-search primary"></i></div>
                    <input class="form-control input" type="text" placeholder="Explore Vuexy..." tabindex="0" data-search="laravel-starter-list" />
                    <ul class="search-list search-list-bookmark"></ul>
                  </div>
                  <!-- select.bookmark-select-->
                  <!--   option 1-Column-->
                  <!--   option 2-Column-->
                  <!--   option Static Layout-->
                </li>
              </ul>
            </div>
            <ul class="nav navbar-nav float-right">
              <li class="dropdown dropdown-language nav-item">
                <a class="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="selected-language">{{ currentLanguage() }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdown-flag">
                  <inertia-link class="dropdown-item" :href="`${ current() }?lang=en`" data-language="en"> English</inertia-link>
                  <inertia-link class="dropdown-item" :href="`${ current() }?lang=bn`" data-language="bn"> বাংলা</inertia-link>
                </div>
              </li>
              <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-expand"><i class="ficon feather icon-maximize"></i></a></li>
              <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                <div class="user-nav d-sm-flex d-none"><span class="user-name text-bold-600">{{ $page.auth.name }}</span></div>
                <span><img class="round" :src="$page.auth.avatar_small" alt="avatar" height="40" width="40" /></span>
              </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" :href="route('users.show', $page.auth.slug)">
                    <i class="feather icon-user"></i> Profile
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="logout"><i class="feather icon-power"></i> Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
    export default {
        name: "Navbar",
        methods: {
          logout: function () {
            this.$inertia.post(this.route('logout'));
          }
        }
    }
</script>

<style>

</style>
