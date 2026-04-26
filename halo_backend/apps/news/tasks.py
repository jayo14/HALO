import requests
from bs4 import BeautifulSoup
from celery import shared_task
from django.db import connection
from apps.knowledge.utils import embed_text

@shared_task
def scrape_lasustech_website():
    url = "https://lasustech.edu.ng/news/"
    # Basic scraping logic
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # This is a placeholder for actual selector-based scraping
    articles = soup.find_all('article')
    for article in articles:
        title = article.find('h2').text
        body = article.find('div', class_='entry-content').text

        # Check if already exists then insert
        with connection.cursor() as cursor:
            cursor.execute("SELECT id FROM news WHERE title=%s", [title])
            if not cursor.fetchone():
                cursor.execute("INSERT INTO news (title, body, category) VALUES (%s, %s, %s)", [title, body, 'news'])
                embedding = embed_text(f"{title}\n{body}")
                cursor.execute("INSERT INTO knowledge_chunks (category, title, content, embedding) VALUES (%s, %s, %s, %s)", ["news", title, body, embedding])
