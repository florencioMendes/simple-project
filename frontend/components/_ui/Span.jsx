import cn from "@/helpers/cn"
import { useEffect, useState } from "react"

function Span({ children, money=false, data=false }) {
    const [child, setChild] = useState(children)

    const style = {
        span: {
            mobileFirst: "font-Poppins text-[4vw] capitalize",
            sm: "sm:text-[1vw]"
        }
    }

    useEffect(() => {
        if (data && !isNaN(parseInt(children[2])) && String(children[2]).length > 5) {
            const date = new Date(parseInt(children[2]) * 1000);

            const padZero = (num) => (num < 10 ? '0' + num : num);

            const day = padZero(date.getDate());
            const month = padZero(date.getMonth() + 1);
            const year = date.getFullYear();
            const hours = padZero(date.getHours());
            const minutes = padZero(date.getMinutes());

            const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;
            setChild(`${children[0]}${children[1]}${formattedDate}`);
        };

        if (money && !isNaN(parseInt(children[2])) && String(children[2]).length <= 5) {
            const formattedMoney = `R$ ${parseFloat(children[2]).toFixed(2)}`;
            setChild(`${children[0]}${children[1]}${formattedMoney}`);
        };

        if (Array.isArray(children[2])) {
            let produtos = children[2].join(", ")
            setChild(`${children[0]}${children[1]}${produtos}`);
        };

    }, [])

    return (
        <span className={cn(style.span.mobileFirst, style.span.sm)}>
            {child}
        </span>
    )
}

export default Span