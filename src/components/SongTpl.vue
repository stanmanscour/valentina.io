<template>
    <article :class="{'active': songHovered}" @mouseover="hoverSong(true)" @mouseout="hoverSong(false)" class="song">
        <div class="song__info">
            <div class="song__background" :style="{ backgroundImage: `url('${song.poster}')` }"></div>
            <div class="song__shadow"></div>
            <div class="song__info__title">
                <p class="song__info__title--name">{{ song.title }}</p>
                <p class="song__info__title--artist">{{ song.artist }}</p>
            </div>
            <div class="song__info__more">
                <span class="song__info__more--counter">{{ song.counter }}</span>
                <span class="song__info__more--time">2:45</span>
            </div>
        </div>
        <template v-if="checkIntoPlaylist">
            <a href="#" @click.prevent="removeFromPlaylist(song)" class="song__actionPlaylist">
                <img src="/src/assets/icons/playlistCheck.svg"> 
            </a>
        </template>
        <template v-else> 
             <a href="#" @click.prevent="addToPlaylist(song)" class="song__actionPlaylist">
                <img src="/src/assets/icons/playlist.svg">
            </a>
        </template>
        <template v-if="songStatus !== 'playing'">
            <a href="#" @click.prevent="playThisSong(song)" class="song__actionPlay" >
                <img src="/src/assets/icons/play.svg">
            </a>
        </template>
        <template v-else>
            <a href="#" @click.prevent="" class="song__actionPause" >
                <img src="/src/assets/icons/pause.svg">
            </a>
        </template>
        <a href="#" @click.prevent="showTplEditSong(song)" class="song__actionConfig">
            <img src="/src/assets/icons/config.svg">
        </a>
    </article>
</template>

<script>
    import { EventBus } from './../main';
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        data: function() {
            return {
                songHovered: false
            }
        },
        props: ['song'],
        computed: {
            ...mapGetters({
                playlist: 'playlist/getPlaylist',
                currentSong: 'player/getCurrentSong',
                playing: 'player/isPlaying',
                paused: 'player/isPaused',
                buffering: 'player/isBuffering'
            }),
            songStatus(){
                if (this.currentSong.src === this.song.src){
                    if (this.playing || this.buffering ){
                        return 'playing';
                    }
                }
            },
            checkIntoPlaylist(){
                let isIn = this.playlist.indexOf(this.song);
                if (isIn === -1 ){
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            ...mapActions({
                playThisSong: 'player/playThis',
                addToPlaylist: 'playlist/addToPlaylist',
                removeFromPlaylist: 'playlist/removeFromPlaylist',
                showTplEditSong: 'editSong/showTplEditSong'
            }),
            hoverSong(boolean) {
                this.songHovered = boolean;
            }
        }
    }
</script>

<style lang="scss">
    @import './../assets/scss/mixins.scss';
    .song {
        border-radius: 2px;
        transition: opacity .3s ease;
        //opacity: 0.8;
        // margin: 10px;
        width: 100%;
        height: 100%;
        background-color: #016b55;
        display: flex;
        flex-direction: row;
        padding: 14px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        //width: 50%;
        @media screen and (min-width: 768px) {}
        &__background {
            transition: all .3s ease;
            //filter: brightness(40%);
            background-size: cover;
            position: absolute;
            left: 0px;
            top: 0px;
            bottom: 0px;
            right: 0px;
        }
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            width: 60%;
            &__title {
                position: absolute;
                bottom: 15px;
                transition: all .3s ease;
                &--name {
                    @extend .val-font;
                    color: white;
                    font-size: 19px;
                    line-height: 23px;
                    @media screen and (min-width: em(768)) {
                        font-size: 23px;
                        line-height: 28px;
                    }
                }
                &--artist {
                    @extend .val-font;
                    color: white;
                    font-size: 13px;
                    margin-top: 4px;
                    margin-bottom: 4px;

                    @media screen and (min-width: em(768)){
                        font-size: 18px;
                    }
                }
            }
            &__more {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                transition: all .3s ease;
                position: absolute;
                bottom: -15px;
                opacity: 0;
                width: 50%;
                &--counter {
                    @extend .val-font;
                    font-size: 12px;
                    color: white;
                }
                &--time {
                    @extend .val-font;
                    font-size: 12px;
                    color: white;
                }
            }
        }
        &__actionPlay {
            z-index: 30;
            position: absolute;
            right: 15px;
            bottom: -45px;
            height: 38px;
            width: 38px;
            opacity: 0;
            transition: all .3s ease;
            &:hover {
                transform: scale(1.2);
                cursor: pointer;
            }
            img {
                width: 100%;
            }
        }
        &__actionPause {
            z-index: 30;
            position: absolute;
            right: 15px;
            bottom: -45px;
            height: 38px;
            width: 38px;
            opacity: 0;
            transition: all .3s ease;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            &:hover {
                transform: scale(1.2);
                cursor: pointer;
            }
            img {
                width: 12px;
            }
        }
        &__actionPlaylist {
            width: 23px;
            height: 23px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 21px;
            bottom: 23px;
            opacity: 0;
            transition: all .4s ease;
            //transition: opacity .3s ease;
        }
        &__actionConfig {
            z-index: 30;
            position: absolute;
            right: 12px;
            top: -40px;
            height: 38px;
            width: 38px;
            opacity: 0;
            transition: all .3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                width: 15px;
                height: 15px;
            }
        }
        &__shadow {
            // position: absolute;
            // filter: blur(1px);
            // left: -30px;
            // right: -30px;
            // background-color: rgba(0, 0, 0, 0.17);
            // bottom: -50px;
            // height: 50px;
            // opacity: 0;
            // transition: all .3s ease;
            position: absolute;
            z-index: 0;
            background-color: rgba(0, 125, 100, 0.95);
            height: 350px;
            width: 100px;
            bottom: -229px;
            transform: rotate(-90deg);
            transition: all .3s ease;
        }
        &.active {
            opacity: 1;
            .song__background {
                //filter: brightness(70%);
            }
            .song__info__title {
                bottom: 30px;
                text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.68)
            }
            .song__actionPlay {
                bottom: 15px;
                opacity: 1;
            }
            .song__actionPause {
                bottom: 15px;
                opacity: 1;
            }
            .song__actionPlaylist {
                bottom: 60px;
                opacity: 1;
            }
            .song__actionConfig {
                top: 12px;
                opacity: 1;
            }
            .song__info__more {
                bottom: 15px;
                opacity: 1;
            }
            .song__shadow {
                // opacity: 1;
                // bottom: -10px;
                // filter: blur(14px);
                bottom: -144px;
                transform: rotate(-80deg);
            }
        }
    }
</style>
