<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="fixed">
            <md-app-toolbar class="md-primary">
                <h3 class="md-title" style="flex: 1">2048</h3>
                <md-button to="/">Home</md-button>
                <md-button to="/leaderboard/">Leaderboard</md-button>
            </md-app-toolbar>
            <md-app-content>
                <router-view/>
            </md-app-content>
        </md-app>
    </div>
</template>

<style lang="scss" scoped>
    .md-app {
        height: 100vh;

        @media (max-width: 960px){
            .md-toolbar, .md-toolbar-row {
                min-height: 64px;
            }
        }
        
        .md-app-content {
            padding: 12px;
        }
    }

    .md-button {
        &.router-link-exact-active:before {
                background-color: currentColor;
                opacity: .12;
        }
    }
</style>

<script>
export default {
  name: "Layout"
};
</script>