import {templates} from "../route";

export async function PUT(request) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id) {
        return Response.json({ error: "Template ID is required" }, { status: 400 });
    }

    try {
        const updatedData = await request.json();

        // Find the existing template
        const templateIndex = templates.findIndex(template => template.id === parseInt(id));

        if (templateIndex === -1) {
            return Response.json({ error: "Template not found" }, { status: 404 });
        }

        // Update only subject and body
        templates[templateIndex] = {
            ...templates[templateIndex],  // Keep all other fields the same
            subject: updatedData.subject || templates[templateIndex].subject,
            body: updatedData.body || templates[templateIndex].body,
        };

        return Response.json({
            message: "Template updated successfully",
            updatedTemplate: templates[templateIndex],  // Return the updated template
        }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
