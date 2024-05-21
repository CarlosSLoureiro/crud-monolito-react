import i18next from "i18next";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pt/zod.json";

import { INVALID_BODY } from "./messages";
import { reformat } from "./reformat";

i18next.init({
  lng: `pt`,
  resources: {
    pt: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

export const validate = <T>(objScheme: Record<keyof T, any>, params: T) => {
  try {
    const scheme = z.object(objScheme);
    const result = scheme.safeParse(params);

    if (!result.success) {
      return NextResponse.json(reformat(result.error), { status: StatusCodes.BAD_REQUEST });
    }
  } catch (error: any) {
    return NextResponse.json({ message: INVALID_BODY }, { status: StatusCodes.BAD_REQUEST });
  }
};

export { z };
