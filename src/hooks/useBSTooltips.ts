import { useEffect, useRef, useState } from "react";
import Tooltip from 'bootstrap/js/dist/tooltip';

const useBSTooltip = <T extends HTMLElement>() => {
  const tooltips = useRef<Tooltip[]>([]);
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(
      (el) => tooltips.current.push(new Tooltip(el))
    );
  }, [ref.current]);

  return {
    ref,
    tooltips: tooltips.current,
  }
}

export default useBSTooltip;