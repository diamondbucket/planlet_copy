from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from datetime import datetime, timedelta
import json
import os
from pprint import pprint

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GOOGLE_API_KEY = "AIzaSyBqWQhdEoTtMd9TVVwlAmdpNNxejNHJLLk"  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def attach_dynamic_dates(posts):
    start_date = datetime.today()  # Starting from today
    updated_posts = []
    for i, post in enumerate(posts):
        dynamic_date = start_date + timedelta(days=i)  # Increment day for each post
        post["date"] = dynamic_date.strftime("%Y-%m-%d")  # Format as YYYY-MM-DD
        updated_posts.append(post)
    return updated_posts

def generate_content_prompt(user_details):
    return f"""
    Create a social media content plan based on these business details:
    Business Type: {user_details.get('businessType')}
    Target Audience: {user_details.get('targetAudience')}
    Goals: {user_details.get('goals')}
    Posts per Month: {user_details.get('postingDays')}
    Special Events: {user_details.get('specialEvents')}
    Content Formats: {user_details.get('contentFormats')}
    Geographic Area: {user_details.get('geographicArea')}

    Please provide a content plan for the next 30 days in this exact JSON format and make sure there are only {user_details.get('postingDays')} posts per month:
    {{
        "posts": [
            {{
                "date": "YYYY-MM-DD",
                "content": "Post description",
                "contentType": "Type (video/image/text)",
                "theme": "Content theme or category",
                "goal": "Specific goal for this post",
            }}
            "summary": "summary of the entire posts provided"
        ]
    }}

    Ensure the dates are actual calendar dates starting from {datetime.today()}.
    """

def parse_ai_response(response_text):
    try:
        print("Raw AI Response: ", response_text)  # Print raw response for debugging
        
        # Extract JSON from response if it's embedded in other text
        start_idx = response_text.find('{')
        end_idx = response_text.rfind('}') + 1
        json_str = response_text[start_idx:end_idx]
        
        # Attempt to parse the JSON
        return json.loads(json_str)
    except Exception as e:
        print(f"Error parsing AI response: {e}")
        return None

@app.route('/submit', methods=['POST'])
def submit_details():
    try:
        user_details = request.json
        print(user_details)
        
        # Generate prompt and get response from Gemini
        prompt = generate_content_prompt(user_details)
        response = model.generate_content(prompt)
        
        # Parse the response into structured format
        content_plan = parse_ai_response(response.text)
        pprint(content_plan)
        if content_plan:
            with open("content_plan.json", "w") as file:
                json.dump(content_plan, file, indent=4)
        else:
            return jsonify({
                "error": "Failed to generate content plan"
            }), 500
        
        return jsonify(content_plan)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@app.route('/get_calendar_events', methods=['GET'])
def get_calendar_events():
    try:
        # Get the current month's content plan
        current_date = datetime.now()
        year = current_date.year
        month = current_date.month
        
        # Retrieve stored content plan or generate new one
        # For demo, we'll generate a sample response
        sample_events = {
            "events": [
                {
                    "date": current_date.strftime("%Y-%m-%d"),
                    "content": "Sample post content",
                    "contentType": "image",
                    "theme": "Engagement",
                    "goal": "Increase brand awareness"
                }
                # Additional events would be here
            ]
        }
        
        return jsonify(sample_events)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
