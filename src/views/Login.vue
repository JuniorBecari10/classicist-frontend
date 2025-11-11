<template>
    <section class="w-screen h-screen flex flex-col items-center justify-center font-oldstd font-400 text-fgray text-lg select-none scl">
        <a href="/" class="mb-10">
            <img src="@/assets/svg/logo.svg" />
        </a>

        <div class="bg-[#252525] rounded-[34px] px-20 py-10 gap-10 grid justify-items-center">
            <div class="bg-fg-lighter rounded-[16px] flex gap-12 px-15 py-4 items-center relative">
                <span
                    class="bg-white rounded-[7px] absolute w-28 h-10 z-0 left-[9%] transition transform delay-0.4"
                    :class="{ 'translate-x-31': option }">
                </span>

                <button
                    class="z-10"
                    :disabled="!option"
                    @click="chgopt"
                    :class="{ sel: !option, 'hover:underline': option }"
                >
                    Login
                </button>
                <button
                    class="ml-5 pl-1 z-10"
                    :disabled="option"
                    @click="chgopt"
                    :class="{ sel: option, 'hover:underline': !option }"
                >
                    Sign Up
                </button>
            </div>

            <!-- Form -->
            <form
                class="bg-[#252525] grid gap-8 justify-items-center"
                @submit.prevent="loghdl"
                novalidate
            >
                <section class="grid gap-6 justify-items-center text-[#a3a3a3]">
                    <!-- Username -->
                    <div class="flex items-center relative">
                        <input
                            type="text"
                            placeholder="Username"
                            v-model="creds[0]"
                            @input="chkcreds($event, 0)"
                            class="outline-none"
                            :minlength="option ? '4' : ''"
                            :maxlength="option ? '16' : ''"
                            :pattern="option ? '[a-zA-Z0-9]+' : '.*'"
                        />
                        <img v-if="errmsgs[1] === false && option" class="absolute right-6" src="@/assets/svg/check.svg" />
                    </div>

                    <span
                        v-if="errmsgs[1] && option"
                        class="w-full -mt-4 ml-1 font-fredoka text-left text-[#e11] text-[80%]">
                        • Username must have more than 3 characters, no spaces and no special characters.
                    </span>

                    <!-- Password -->
                    <div class="flex items-center relative">
                        <div
                            class="bg-gray-700 rounded-[12px] w-full overflow-hidden relative transition-[padding]"
                            :class="creds[1].length && option ? 'pb-1.5' : ''">
                            <div class="flex items-center">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    v-model="creds[1]"
                                    @input="chkcreds($event, 1)"
                                    @keydown="blocksp"
                                    :minlength="option ? '8' : ''"
                                    :maxlength="option ? '16' : ''"
                                    :pattern="option ? '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).+$' : '.*'"
                                    class="relative z-20 flex-1 bg-transparent outline-none"
                                />
                            </div>

                            <div
                                v-show="option"
                                class="absolute left-0 right-0 bottom-0 h-4 rounded-b-[12px] z-10 transition-all duration-300"
                                :style="`width: ${pwrdscore()}%; background: ${strhue()}`"
                            ></div>
                        </div>

                        <img v-if="errmsgs[2] === false && option" class="absolute right-6" src="@/assets/svg/check.svg" />
                    </div>

                    <!-- Password Strength / Errors -->
                    <span
                        v-if="creds[1].length && option"
                        class="w-full max-w-[495px] -mt-4 -ml-12.75 font-fredoka text-left text-[80%]"
                        :style="{ color: strhue() }">
                        {{ strlabel() }}
                    </span>

                    <span
                        v-if="option && found"
                        class="w-full max-w-[495px] -mt-3 -ml-12.75 font-fredoka text-left text-[#e11] text-[80%]">
                        • This password was found on a database of known hacked passwords.
                    </span>

                    <span
                        v-if="errmsgs[2] && option"
                        class="w-full max-w-[495px] -mt-4 -ml-12.75 font-fredoka text-left text-[#e11] text-[80%]">
                        • Password must have at least 8 characters and include lowercase, uppercase, numbers, and special characters.
                    </span>

                    <!-- Confirm Password -->
                    <section
                        class="overflow-hidden transition-all ease-linear"
                        :class="option ? 'max-h-[500px]' : 'max-h-0'"
                    >
                        <div class="flex items-center relative">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                v-model="creds[2]"
                                @input="chkcreds(null, 2)"
                                class="outline-none"
                                maxlength="16"
                            />
                            <svg
                                v-if="errmsgs[3] === false && option"
                                class="absolute right-10"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                height="30"
                                width="30"
                            >
                                <path
                                    d="M19.3,5.3L9,15.6l-4.3-4.3l-1.4,1.4l5,5L9,18.4l0.7-0.7l11-11L19.3,5.3z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </section>

                    <span
                        v-if="errmsgs[3] && creds[1].length && creds[2].length && option"
                        class="w-full -mt-4 ml-1 font-fredoka text-left text-[#e11] text-[80%]"
                    >
                        Passwords don't match.
                    </span>

                    <span
                        v-if="errmsgs[0] && !option"
                        class="w-full -mt-10 ml-1 font-fredoka text-left text-[#e11] text-[80%]"
                    >
                        Incorrect username or password.
                    </span>
                </section>

                <input
                    type="submit"
                    :value="option ? 'Sign Up' : 'Login'"
                    class="bg-white rounded-[7px] text-black px-10 py-3 justify-center transition delay-0.4"
                    :disabled="dis"
                />
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onUpdated, ref } from 'vue';
    import pwned from '../composables/pwned.ts';
    import { useRouter } from "vue-router";

    const router = useRouter();

    const option = ref(false)
    const creds = ref(['', '', '']) /* username, password, confirm password */
    const dis = ref(true)
    const errmsgs: any = ref([undefined, undefined, undefined, undefined]) /* login failed, user reqs, pwrd reqs, pwrds dont match */
    const pwrdchks: any = ref({
        length: false,
        upper: false,
        number: false,
        special: false
    })
    const found = ref(false)

    const chgopt =()=> {
        errmsgs.value[0] = undefined
        for (let i = 1; i < errmsgs.value.length; i++) if (!creds.value[i - 1]) errmsgs.value[i] = undefined
        option.value = !option.value
    }

    const loghdl = () => {
        const username = creds.value[0]?.trim();
        const password = creds.value[1];

        errmsgs.value = [undefined, undefined, undefined, undefined];

        if (!username) {
            errmsgs.value[1] = true; // username required
            return;
        }
        if (!password) {
            errmsgs.value[2] = true; // password required
            return;
        }

        // SIGN UP
        if (option.value) {
            const existing = localStorage.getItem(`user:${username}`);
            if (existing) {
                errmsgs.value[0] = "This username is already registered.";
                return;
            }

            localStorage.setItem(
                `user:${username}`,
                JSON.stringify({ password })
            );

            router.push(`/app/${username}`);
            return;
        }

        // LOGIN
        const stored = localStorage.getItem(`user:${username}`);
        if (!stored) {
            errmsgs.value[0] = true; // user not found
            return;
        }

        const { password: storedPass } = JSON.parse(stored);
        if (storedPass !== password) {
            errmsgs.value[0] = true; // wrong password
            return;
        }

        router.push(`/app/${username}`);
    };

    const chkcreds =(e: any, field: number)=> {
        if (!creds.value[field].length) errmsgs.value[field + 1] = undefined
        else {
            switch (field) {
                case 0:
                    errmsgs.value[1] = !e.target.validity.valid; break
                case 1:
                    errmsgs.value[2] = !e.target.validity.valid
                    errmsgs.value[3] = (creds.value[1] !== creds.value[2]); break
                case 2:
                    errmsgs.value[3] = (creds.value[1] !== creds.value[2])
            }
        }
    }
    const blocksp =(e: any)=> {
        if (e.code === 'Space') e.preventDefault()
    }
    const pwrdscore =()=> {
        let score: number = 0
        let reqs = pwrdchks.value
        const unique =()=> {
            const chars: string[] = creds.value[1].split("")
            if (!chars.length) return false
            for (let p = 0; p < chars.length; p++) {
                for (let i = p + 1; i < chars.length; i++) {
                    if (chars[p] === chars[i]) return false
                }
            }
            return true
        }
        const charseq =()=> {
            const chars: string[] = creds.value[1].split("")
            for (let i = 1; i < chars.length; i++) {
                if (chars[i - 1] === chars[i] && chars[i + 1] === chars[i]) return true
            }
            return false
        }
        const numseq =()=> {
            const nums: number[] = creds.value[1].split("").map(Number)
            for (let i = 1; i < nums.length; i++) {
                if (nums[i - 1] + 1 === nums[i] && nums[i + 1] - 1 === nums[i]) return true
            }
            return false
        }

        for (let r of Object.values(reqs)) if (r) score += 6
        score += creds.value[1].length * 2
        if (reqs.length > 12) score += 4
        if (reqs.length === 16) score += 4
        if (found.value) score -= 15
        if (unique()) score += 4
        if (charseq()) score -= 10
        if (numseq()) score -= 10

        return (score > 0) ? score * (10 / 6) : 0
    }
    const strlabel =()=> {
        let score: number = Math.floor(pwrdscore() / 20)
        const labels: string[] = ["Terrible", "Very Weak", "Weak", "Medium", "Good", "Strong"]
        if (score === 5) return "Almighty"
        else return labels[score]
    }
    const strhue =()=> {
        let score: number = Math.ceil(pwrdscore() / 20)
        const hues: string[] = ['f00', 'f50', 'ff0', 'af0', '0f0']
        return '#' + hues[score - 1]
    }

    onUpdated(() => {
        let chk: boolean = Boolean(creds.value[0].length && creds.value[1].length)
        if (option.value) {
            chk &&= Boolean(creds.value[2].length)
            for (let i = 1; i < errmsgs.value.length; i++) chk &&= (errmsgs.value[i] === false)
        }
        dis.value = !Boolean(chk)

        const patterns: RegExp[] = [/[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/]
        let reqs = pwrdchks.value

        for (let k in reqs) {
            let i: number = 0
            if (k === 'length') reqs[k] = creds.value[1].length >= 8
            else reqs[k] = patterns[i++].test(creds.value[1])
        }

        found.value = (pwned.includes(creds.value[1]))
        console.clear()
        console.log(errmsgs.value)
    })
</script>

<style scoped>
    input:not([type="submit"]) {
        background: #4b4b4b;
        border-radius: 12px;
        padding-left: 2rem;
        padding-block: 13px;
        width: 550px;
    }

    .scl {
        scale: 90%;
    }
    
    .sel {
        color: black;
        transition: color 0.4s;
    }
    
    button:hover, input[type="submit"]:hover {
        cursor: pointer;
    }

    button:disabled {
        cursor: default;
    }

    input[type="submit"]:disabled {
        cursor: not-allowed;
        background: #333;
        color: #808080
    }
</style>
