package com.rankup.rankup_backend.util;

public class SlugUtil {
    private SlugUtil() {}

    public static String toSlug(String input) {
        if (input == null) return null;
        String s = input.trim().toLowerCase();
        s = s.replaceAll("[^a-z0-9\\s-]", "");   // remove special chars
        s = s.replaceAll("\\s+", "-");          // spaces -> hyphen
        s = s.replaceAll("-{2,}", "-");         // collapse hyphens
        return s;
    }
}
