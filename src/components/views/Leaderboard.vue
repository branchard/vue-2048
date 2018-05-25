<template>
    <div>
        <md-table v-model="searched" md-sort="score" md-sort-order="desc" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Leaderboard</h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by nickname..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                md-label="Leaderboard is empty"
                md-description="There is no users in leaderboard">
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Rank" md-sort-by="id" md-numeric>{{ 1 }}</md-table-cell>
                <md-table-cell md-label="Nickname" md-sort-by="name">{{ item.nickname }}</md-table-cell>
                <md-table-cell md-label="Score" md-sort-by="email">{{ item.score }}</md-table-cell>
                <md-table-cell md-label="Time" md-sort-by="gender">{{ item.time }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<style lang="scss" scoped>
    .md-field {
        max-width: 300px;
    }
</style>

<script>
import leaderboardApi from '@/utils/leaderboardApi';

const toLower = text => {
    return text.toString().toLowerCase();
}

const searchByName = (items, term) => {
    if (term) {
        return items.filter(item => toLower(item.nickname).includes(toLower(term)));
    }

    return items;
}

export default {
    name: "Leaderboard",
    data: () => ({
        search: null,
        searched: [],
        leaderboard: []
    }),
    methods: {
        searchOnTable () {
            this.searched = searchByName(this.leaderboard, this.search)
        }
    },
    created: function () {
        leaderboardApi.getLeaderbord().then((data) => {
            this.leaderboard = data;
            this.searched = data;
        });
    }
};
</script>