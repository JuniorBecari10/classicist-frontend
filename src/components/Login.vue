<script>

</script>

<template>
    <section class="bg-black flex w-screen h-screen justify-center items-center font-oldstd font-light">
        <div class="bg-[#252525] rounded-[34px] px-20 py-10 gap-10 grid cols-1 justify-center items-center justify-items-center">
            <div class="bg-[#333] rounded-[16px] w-[278px] flex gap-10 text-[20px] px-10 py-3 justify-center">
                <div>Login</div>
                <div>Sign Up</div>
            </div>
            <form class="bg-[#252525] grid gap-5">
                <input type="text" placeholder="Username" required>
                <input type="text" placeholder="Password" required>
                <input type="text" placeholder="Confirm Password" required>
            </form>
            <div class="bg-[#333] rounded-[16px] w-[278px] flex gap-10 text-[20px] px-1 py-3 justify-center">
                Sign Up
            </div>
        </div>
        
        
    </section>
</template>

<style>
    label {
        color: #eee;
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: bold;
    }
    input {
        background: #4b4b4b;
        border-radius: 12px;
        padding-left: 5px;
        width: 500px;
        height: 50px;
    }
    
</style>