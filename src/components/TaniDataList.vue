<template>
  <v-layout align-start justify-center row wrap v-if="taniData" class="mt-2">
    <v-expansion-panel>
      <v-expansion-panel-content v-for="(key, index) in Object.keys(taniData)" :key="index">
        <template v-slot:header>
          <div class="pl-2 font-weight-bold">Date {{taniData[key].date}}</div>
        </template>
        <v-card>
          <v-card-text class="pa-0">
            <v-list>
              <v-list-tile v-if="taniData[key].cone">
                <v-list-tile-content>
                  <p
                    class="mb-0"
                    v-for="(typeofcone, i) in Object.keys(taniData[key].cone)"
                    :key="i"
                  >
                    <v-icon>chevron_right</v-icon>
                    &nbsp;
                    {{typeofcone}} - Cone : {{taniData[key].cone[typeofcone]}} Kg
                  </p>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="taniData[key].zari">
                <v-list-tile-content>
                  <p
                    class="mb-0"
                    v-for="(typeofzari, i) in Object.keys(taniData[key].zari)"
                    :key="i"
                  >
                    <v-icon>chevron_right</v-icon>
                    &nbsp;
                    {{typeofzari}} - Zari : {{taniData[key].zari[typeofzari]}} Kg
                  </p>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="taniData[key].saree">
                <v-list-tile-content>
                  <p class="mb-0">
                    <v-icon>chevron_right</v-icon>
                    &nbsp;Saree Details: {{taniData[key].saree}}
                  </p>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile v-if="taniData[key].money">
                <v-list-tile-content>
                  <p class="mb-0">
                    <v-icon>chevron_right</v-icon>
                    &nbsp;Money: {{taniData[key].money}} Rs
                  </p>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script>
export default {
  name: "TaniDataList",
  props: ["taniData"]
};
</script>

<style scoped>
button {
  margin-right: 0.2rem;
  font-size: 0.9rem;
}
.detail {
  font-size: 14px;
}
.detail > i {
  font-size: 12px;
}
.card-body,
.card-header {
  padding: 0;
}
.card {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}
</style>
