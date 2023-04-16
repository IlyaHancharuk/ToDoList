import React, { DetailedHTMLProps, FC, HTMLAttributes, InputHTMLAttributes, useState } from "react";
import SuperInputText from "../SupetInputText/SuperInputText";
import s from './SuperEditableSpan.module.css';

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperEditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    spanClassName?: string;
    spanProps?: DefaultSpanPropsType;
}

const SuperEditableSpan: FC<SuperEditableSpanType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,
        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {};

    const onEnterCallback = () => {
        setEditMode(false);
        onEnter && onEnter();
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false);
        onBlur && onBlur(e);
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true);
        onDoubleClick && onDoubleClick(e);
    }

    const spanClassName = `${s.superSpan} ${className}`;

    return (
        <>
            {editMode
                ? (
                    <SuperInputText
                        autoFocus
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        {...restProps}
                    />
                ) : (
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}

                        {...restSpanProps}
                    >
                        {children || restProps.value}
                    </span>
                )
            }
        </>
    )
}

export default SuperEditableSpan;
