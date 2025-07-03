export function formDataToJson(formData: FormData): string {
    const obj: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (value instanceof File) {
        obj[key] = {
          name: value.name,
          type: value.type,
          size: value.size,
        };
      } else {
        obj[key] = value;
      }
    });
    return JSON.stringify(obj);
  }
  