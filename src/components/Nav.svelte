<div class="c-flex g-top-navigation">
    <header>
        <div class="logo-menu-bar-holder">
            <div class="menu-bar">
                <Menu size='24px' /> 
            </div>            
            <div class="logo-holder">
                <img src="svelte-google-calendar-logo.png" class="img-responsive" alt="svelte google calendar logo" />
            </div>
            <div class="logo-name">
                <h5>Calendar</h5>
            </div>
        </div>
    </header>
</div>

<script>
    import Menu from "svelte-material-icons/Menu.svelte";
    export let segment;
</script>

<style>
    .g-top-navigation {
        flex: 0 0 64px;
        border-bottom: 1px solid #dadce0;
        padding: 8px 16px;
    }

    .g-top-navigation header {
        width: 100%;
    }

    .logo-menu-bar-holder {
        display: inline-block;
        vertical-align: top;
    }

    .menu-bar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        text-align: center;
        padding: 12px;
        cursor: pointer;
        user-select: none;
        display: inline-block;
        vertical-align: top;
    }

    .menu-bar:hover {
        background-color: #f0f0f0;
    }

    .logo-holder {
        display: inline-block;
        vertical-align: top;    
        width: 44px;
        margin-top: 2px;    
    }

    .logo-name {
        display: inline-block;
        vertical-align: top;    
    }

    .logo-name h5 {
        margin: 0;
        font-weight: 400;
        color: #5f6368;
        padding-left: 4px;
        font-size: 24px;
        line-height: 24px;
        padding-top: 13px;
    }

</style>