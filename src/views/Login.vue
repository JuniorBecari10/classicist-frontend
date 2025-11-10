<template>
    <section
        class="w-screen h-screen flex flex-col items-center justify-center font-oldstd font-400 text-[#7d7d7d] text-[23px] select-none scl"
    >
        <!-- Logo -->
        <a href="/" class="mb-10">
            <svg
                width="70"
                height="102"
                viewBox="0 0 35 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto"
            >
                <path
                    d="M17.568 42.864C14.592 42.864 12.032 42 9.888 40.272C7.744 38.544 6.112 36.288 4.992 33.504C3.904 30.688 3.36 27.728 3.36 24.624C3.36 21.392 3.904 18.432 4.992 15.744C6.08 13.056 7.632 10.928 9.648 9.36C11.664 7.76 14.016 6.96 16.704 6.96C18.112 6.96 19.44 7.28 20.688 7.92C21.936 8.56 22.96 9.248 23.76 9.984C24.528 10.688 25.04 11.04 25.296 11.04C25.552 11.04 25.728 10.96 25.824 10.8C25.952 10.64 26.08 10.384 26.208 10.032L27.12 7.344H28.32L28.512 22.224H27.168C26.464 19.184 25.552 16.64 24.432 14.592C23.312 12.512 22.08 10.976 20.736 9.984C19.424 8.992 18.112 8.496 16.8 8.496C13.76 8.496 11.6 9.872 10.32 12.624C9.072 15.376 8.448 19.376 8.448 24.624C8.448 30.032 9.104 34.176 10.416 37.056C11.728 39.904 14.112 41.328 17.568 41.328C20.64 41.328 22.976 40.192 24.576 37.92C26.208 35.616 27.136 32.832 27.36 29.568H29.088C28.992 31.456 28.592 33.408 27.888 35.424C27.216 37.44 26.032 39.184 24.336 40.656C22.64 42.128 20.384 42.864 17.568 42.864Z"
                    fill="white"
                />
                <line x1="10.5" y1="10" x2="10.5" y2="38" stroke="white" />
                <line x1="12.5" y1="9" x2="12.5" y2="41" stroke="white" />
                <line x1="14.5" y1="8" x2="14.5" y2="42" stroke="white" />
                <line x1="16.5" y1="7" x2="16.5" y2="42" stroke="white" />
            </svg>
        </a>

        <!-- Auth Box -->
        <div
            class="bg-[#252525] rounded-[34px] px-20 py-10 gap-10 grid justify-items-center"
        >
            <!-- Switch Buttons -->
            <div
                class="bg-[#333] rounded-[16px] flex gap-12 px-15 py-4 items-center relative"
            >
                <span
                    class="bg-white rounded-[7px] absolute w-28 h-10 z-0 left-[10%] transition transform delay-0.4"
                    :class="{ 'translate-x-30': option }"
                ></span>

                <button
                    class="z-10"
                    :disabled="!option"
                    @click="chgopt"
                    :class="{ sel: !option }"
                >
                    Login
                </button>
                <button
                    class="pl-1 z-10"
                    :disabled="option"
                    @click="chgopt"
                    :class="{ sel: option }"
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
                        <svg
                            v-if="errmsgs[1] === false && option"
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

                    <span
                        v-if="errmsgs[1] && option"
                        class="w-full -mt-4 ml-1 font-fredoka text-left text-[#e11] text-[80%]"
                    >
                        Username must have more than 3 characters.
                    </span>

                    <!-- Password -->
                    <div class="flex items-center relative">
                        <div
                            class="bg-gray-700 rounded-[12px] w-full overflow-hidden relative transition-[padding]"
                            :class="creds[1].length && option ? 'pb-1.5' : ''"
                        >
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

                        <svg
                            v-if="errmsgs[2] === false && option"
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

                    <!-- Password Strength / Errors -->
                    <span
                        v-if="creds[1].length && option"
                        class="w-full max-w-[495px] -mt-4 -ml-12.75 font-fredoka text-left text-[80%]"
                        :style="{ color: strhue() }"
                    >
                        {{ strlabel() }}
                    </span>

                    <span
                        v-if="option && found"
                        class="w-full max-w-[495px] -mt-3 -ml-12.75 font-fredoka text-left text-[#e11] text-[80%]"
                    >
                        This password was found on a database of known hacked passwords.
                    </span>

                    <span
                        v-if="errmsgs[2] && option"
                        class="w-full max-w-[495px] -mt-4 -ml-12.75 font-fredoka text-left text-[#e11] text-[80%]"
                    >
                        Password must include lowercase, uppercase, numbers, and special characters.
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

<script setup lang = "ts">
    import { onUpdated, ref } from 'vue';
    import pwned from '../composables/pwned.ts'

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
    const loghdl =()=> {
        if (!option.value) {
            if (creds.value[0] + creds.value[1] === 'antonioClass!C25') {
                alert('Login succeded')
                // Send to home page
            } else {
                errmsgs.value[0] = true
            }
        } else {
            alert(`
            Username: ${creds.value[0]}\n
            Password; ${creds.value[1]}
            `)
            // Send to home page
        }
    }

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
        const labels: string[] = ["Very Weak", "Weak", "Medium", "Good", "Strong"]
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

<style>
    input:not([type="submit"]) {
        background: #4b4b4b;
        border-radius: 12px;
        padding-left: 2rem;
        padding-block: 13px;
        width: 550px;
    }
    .scl {scale: 90%}
    .sel {
        color: black;
        transition: color 0.4s;
    }
    button:hover, input[type="submit"]:hover {cursor: pointer}
    button:disabled {cursor: default}
    input[type="submit"]:disabled {
        cursor: not-allowed;
        background: #333;
        color: #808080
    }

</style>
