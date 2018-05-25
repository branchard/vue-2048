<template>
    <div class="leaderboard">
        <md-table v-model="searched" md-sort="rank" md-sort-order="desc" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Leaderboard (Top 100)</h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by nickname..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                md-label="Leaderboard is loading..."
                md-description="Please wait...">
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Rank" md-sort-by="rank"># {{ item.rank }}</md-table-cell>
                <md-table-cell md-label="Nickname" md-sort-by="nickname">{{ item.nickname }}</md-table-cell>
                <md-table-cell md-label="Score" md-sort-by="score" md-numeric>{{ item.score }}</md-table-cell>
                <md-table-cell md-label="Time" md-sort-by="time" md-numeric>{{ Number.parseFloat(item.time).toFixed(2) }} sec</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<style lang="scss" scoped>
    .leaderboard {
        width: 100%;
        height: 100%;

        .md-table {
            width: 100%;
            height: 100%;
            margin-right: 0;
            margin-left: 0;
        }
    }
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