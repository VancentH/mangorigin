<template lang="pug">
Breadcrumb(:style="{marginBottom: '16px'}")
    BreadcrumbItem {{ breadcrumb.root }}
    BreadcrumbItem(v-show="breadcrumb.level2") {{ breadcrumb.level2 }}
    BreadcrumbItem(v-show="breadcrumb.level3") {{ breadcrumb.level3 }}
</template>

<script>
export default {
    props: {
        breadcrumb: {
            type: Object,
            default () {
                return []
            }
        }
    }
}
</script>

<style lang="less">
</style>
