package com.comforttravels.mapper;

import com.comforttravels.dto.BlogDto;
import com.comforttravels.entity.Blog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BlogMapper {
    BlogMapper INSTANCE = Mappers.getMapper(BlogMapper.class);
    BlogDto toDto(Blog e);
    java.util.List<BlogDto> toDto(java.util.List<Blog> list);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Blog toEntity(BlogDto d);
}