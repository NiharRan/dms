<template>
  <div
    class="main-menu menu-accordion menu-shadow"
    data-scroll-to-active="true"
    :class="$page.configData.menuType + ' ' + [($page.configData.theme === 'light') ? 'menu-light' : 'menu-dark' ]">
  <div class="navbar-header">
    <ul class="nav navbar-nav flex-row">
      <li class="nav-item mr-auto"><a class="navbar-brand" href="dashboard-analytics">
        <div class="brand-logo"></div>
        <h2 class="brand-text mb-0">Vuexy</h2>
      </a></li>
      <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"></i><i class="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block primary collapse-toggle-icon" data-ticon="icon-disc"></i></a></li>
    </ul>
  </div>
  <div class="shadow-bottom"></div>
  <div class="main-menu-content">
    <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
      <li class="nav-item">
        <a href="/">
          <i class="feather icon-home"></i>
          <span class="menu-title" data-i18n="">ড্যাশবোর্ড</span>
        </a>
      </li>



      <li class="nav-item has-sub">
        <a href="">
          <i class="feather icon-users"></i>
          <span class="menu-title" data-i18n="">ব্যবহারকারী</span>
        </a>
        <ul class="menu-content">
          <li class="">
            <a href="/users/create">
              <i class="feather icon-plus"></i>
              <span class="menu-title" data-i18n="">নতুন</span>
            </a>
          </li>
          <li class="">
            <a href="/users">
              <i class="feather icon-circle"></i>
              <span class="menu-title" data-i18n="">তালিকা</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="navigation-header">
        <span>Settings</span>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('roles.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">Role</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('genders.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">Gender</span>
        </inertia-link>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style>

</style>
