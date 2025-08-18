import _accept from "./attr-accept";
import { ErrorCode, type FileError } from "./types";

// @ts-expect-error
const accepts = typeof _accept === "function" ? _accept : _accept.default;

/**
 *
 * @param {string} accept
 */
export const getInvalidTypeRejectionErr = (accept: string = ""): FileError => {
  const acceptArr = accept.split(",");
  const msg =
    acceptArr.length > 1 ? `one of ${acceptArr.join(", ")}` : acceptArr[0];

  return {
    code: ErrorCode.FileInvalidType,
    message: `File type must be ${msg}`,
  };
};

export const getTooLargeRejectionErr = (
  maxSize: string | number
): FileError => {
  return {
    code: ErrorCode.FileTooLarge,
    message: `File is larger than ${maxSize} ${
      maxSize === 1 ? "byte" : "bytes"
    }`,
  };
};

export const getTooSmallRejectionErr = (
  minSize: string | number
): FileError => {
  return {
    code: ErrorCode.FileTooSmall,
    message: `File is smaller than ${minSize} ${
      minSize === 1 ? "byte" : "bytes"
    }`,
  };
};

export const TOO_MANY_FILES_REJECTION: FileError = {
  code: ErrorCode.TooManyFiles,
  message: "Too many files",
};

/**
 * Check if file is accepted.
 *
 * Firefox versions prior to 53 return a bogus MIME type for every file drag,
 * so dragovers with that MIME type will always be accepted.
 */
export function fileAccepted(file: File, accept: string) {
  const isAcceptable =
    file.type === "application/x-moz-file" || accepts(file, accept);

  return [
    isAcceptable,
    isAcceptable ? null : getInvalidTypeRejectionErr(accept),
  ];
}

type FileResponseMatchSize = [boolean, FileError] | [boolean, null];

export function fileMatchSize(
  file: File,
  minSize: number,
  maxSize: number
): FileResponseMatchSize {
  if (isDefined(file.size)) {
    if (isDefined(minSize) && isDefined(maxSize)) {
      if (file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
      if (file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];
    } else if (isDefined(minSize) && file.size < minSize)
      return [false, getTooSmallRejectionErr(minSize)];
    else if (isDefined(maxSize) && file.size > maxSize)
      return [false, getTooLargeRejectionErr(maxSize)];
  }
  return [true, null];
}

function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}
