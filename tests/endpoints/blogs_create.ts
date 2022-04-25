import { API_URL } from "../api_url.ts";
import { hasValue, jsonAuthHeaders, jsonHeaders, test } from "../utils.ts";

export type NeededBlogsCreateInformation = {
    userId: string;
    token: string;
};

export type ReturnedBlogsCreatedInformation = {
    blogId: string;
};

export const testBlogsCreateUnauthorized = async ({
    userId,
}: NeededBlogsCreateInformation) => {
    const res = await (
        await fetch(API_URL + "/blogs/create", {
            headers: jsonHeaders(),
            method: "POST",
            body: JSON.stringify({
                title: "Test articles",
                content: "Test content. ".repeat(64),
                authorUserId: userId,
            }),
        })
    ).json();

    test(res.ok === false, "unauthorized blog create response was ok");
    test(
        hasValue(res.error),
        `unauthorized blog create response did not contain field error`,
    );
    test(
        res.error === "Unauthorized",
        `unauthorized blog create response error was ${res.error}, expected 'Unathorized'`,
    );
};

export const testBlogsCreateTitleInvalid = async ({
    userId,
}: NeededBlogsCreateInformation) => {
    const res = await (
        await fetch(API_URL + "/blogs/create", {
            headers: jsonHeaders(),
            method: "POST",
            body: JSON.stringify({
                title: "",
                content: "Test content. ".repeat(64),
                authorUserId: userId,
            }),
        })
    ).json();

    test(res.ok === false, "blog w no title create response was ok");
    test(
        hasValue(res.error),
        `blog w no title create response did not contain field error`,
    );
    test(
        res.error === "Unauthorized",
        `blog w no title create response error was ${res.error}, expected 'Unathorized'`,
    );
};

export const testBlogsCreateValid = async ({
    token,
    userId,
}: NeededBlogsCreateInformation): Promise<ReturnedBlogsCreatedInformation> => {
    const testBlog = {
        title: "Test articles",
        content: "Test content. ".repeat(64),
        authorUserId: userId,
    };
    const res = await (
        await fetch(API_URL + "/blogs/create", {
            headers: jsonAuthHeaders(token),
            method: "POST",
            body: JSON.stringify(testBlog),
        })
    ).json();

    test(res.ok === true, "valid blog create response was not ok");
    test(hasValue(res.blog), "valid blog create response doesn't contain blog");
    test(
        hasValue(res.blog.id),
        "valid blog create response doesn't contain blog.id",
    );
    test(
        hasValue(res.blog.title),
        "valid blog create response doesn't contain blog.title",
    );
    test(
        hasValue(res.blog.content),
        "valid blog create response doesn't contain blog.content",
    );
    test(
        hasValue(res.blog.authorUserId),
        "valid blog create response doesn't contain blog.authorUserId",
    );
    test(
        res.blog.title === testBlog.title,
        "valid blog create response title was different from test blog",
    );
    test(
        res.blog.content === testBlog.content,
        "valid blog create response content was different from test content",
    );
    test(
        res.blog.authorUserId === userId,
        "valid blog create response author was different from creating user",
    );

    return { blogId: res.id };
};

export const testBlogsCreate = async (
    req: NeededBlogsCreateInformation,
): Promise<ReturnedBlogsCreatedInformation> => {
    await testBlogsCreateUnauthorized(req);
    return await testBlogsCreateValid(req);
};
