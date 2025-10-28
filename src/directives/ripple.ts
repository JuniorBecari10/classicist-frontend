import type { Directive } from "vue";

export const ripple: Directive = {
    mounted(el) {
        el.style.position = "relative";
        el.style.overflow = "hidden";

        el.addEventListener("click", (e: MouseEvent) => {
            const circle = document.createElement("span");
            const diameter = Math.max(el.clientWidth, el.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;

            circle.style.left = `${e.clientX - el.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - el.getBoundingClientRect().top - radius}px`;
            
            circle.style.position = "absolute";
            circle.style.background = "rgba(255, 255, 255, 0.3)";
            circle.style.borderRadius = "50%";
            
            circle.style.transform = "scale(0)";
            circle.style.animation = "ripple 400ms linear";
            circle.style.pointerEvents = "none";

            el.appendChild(circle);
            circle.addEventListener("animationend", () => circle.remove());
        });
    },
};
